import { useRef, useState, memo, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

import moment from "moment";
import { type as typeEnum } from "../../../enums/progress";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import CircularProgress from "@material-ui/core/CircularProgress";

const COUNT = 3;

const PaymentCard = props => {
  const { amount, created, tanggal, _id: id, ...rest } = props;
  return (
    <Card {...rest} style={{ marginTop: 8 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {moment.unix(tanggal).format("ll")}
        </Typography>
        <Typography variant="body2" component="p">
          {`Rp.${amount}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PaymentSkeleton = props => (
  <Skeleton variant="rect" height={36} style={{ marginTop: "8px" }} {...props} />
);

const renderPaymentSkeleton = (n = COUNT) =>
  Array(n)
    .fill(0)
    .map((_, index) => <PaymentSkeleton key={index} />);

const Payment = props => {
  const {} = props;

  const user = useSelector(state => state.loginUser);
  const sentinelEnd = useRef(null);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "payment",
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://sipema.herokuapp.com/b/payment/get/s/${user.student_id}/${pageParam}/${COUNT}`,
        {
          headers: {
            token: window.localStorage.getItem("login_token"),
          },
        },
      );
      return await res.json();
    },
    {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.payments.length < COUNT
          ? false
          : allPages.reduce((acc, curr) => acc + curr.payments.length, 0);
      },
    },
  );

  const payment = data?.pages.reduce((acc, curr) => {
    acc.push(...curr.payments);
    return acc;
  }, []);

  useIntersectionObserver({
    target: sentinelEnd,
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage,
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Pembayaran {data && isFetching && !isFetchingNextPage && <CircularProgress size={16} />}
      </Typography>
      {!data && renderPaymentSkeleton()}
      {payment?.map((payment, index) => (
        <PaymentCard {...payment} key={index} />
      ))}
      {isFetchingNextPage && renderPaymentSkeleton(2)}
      {!isFetchingNextPage && <div className="sentinel-end" ref={sentinelEnd}></div>}
      {/* {data && !hasNextPage && <Typography align="center">Tidak ada riwayat pembayaran lagi...</Typography>} */}
    </>
  );
};

export default Payment;
