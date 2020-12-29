import { useRef, useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";
import { type as typeEnum } from "../../../enums/progress";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ProgressSkeleton = props => (
  <Skeleton variant="rect" height={22} style={{ marginTop: "8px" }} {...props} />
);

const ProgressCard = props => {
  const {
    hal_akhir: halAkhir,
    hal_awal: halAwal,
    tanggal,
    type,
    created,
    comment,
    _id: id,
    surat_awal: suratAwal,
    surat_akhir: suratAkhir,
    ayat_awal: ayatAwal,
    ayat_akhir: ayatAkhir,
  } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{moment.unix(tanggal).format("ll")}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        <Typography>
          {type === typeEnum.IQRA
            ? `Iqra, ${halAwal} - ${halAkhir}`
            : `Quran, ${suratAwal}(${ayatAwal}) - ${suratAkhir}(${ayatAkhir})`}
        </Typography>
        <Typography>Komentar:</Typography>
        <Typography>{comment}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const COUNT = 5;

const renderProgressSkeleton = (n = COUNT) =>
  Array(n)
    .fill(0)
    .map((_, index) => <ProgressSkeleton key={index} />);

const Progress = props => {
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
    "progress",
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://sipema.herokuapp.com/b/progress/get/s/${user.student_id}/${pageParam}/${COUNT}`,
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
        return lastPage.progresses.length < COUNT
          ? false
          : allPages.reduce((acc, curr) => acc + curr.progresses.length, 0);
      },
    },
  );

  const progress = data?.pages.reduce((acc, curr) => {
    acc.push(...curr.progresses);
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
        Riwayat Bacaan {data && isFetching && !isFetchingNextPage && <CircularProgress size={16} />}
      </Typography>
      {!data && renderProgressSkeleton()}
      {progress?.map((progress, index) => (
        <ProgressCard {...progress} key={index} />
      ))}
      {isFetchingNextPage && renderProgressSkeleton(2)}
      {!isFetchingNextPage && <div className="sentinel-end" ref={sentinelEnd}></div>}
      {/* {data && !hasNextPage && <Typography align="center">Tidak ada riwayat lagi...</Typography>} */}
    </>
  );
};

export default memo(Progress);
