import { useRef, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { useInfiniteQuery } from "react-query";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: "0.75rem",
  },
}));

const useCardStyles = makeStyles(theme => ({
  card: {
    padding: 16,
    marginBottom: 8,
    cursor: "pointer",
  },
}));

const AnnouncementCard = props => {
  const classes = useCardStyles();
  const { body, title, _id: id } = props;
  const history = useHistory();
  return (
    <Card
      className={classes.card}
      elevation={2}
      onClick={() => history.push(`/announcement/${id}`)}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography gutterBottom color="textSecondary">
        {body}
      </Typography>
    </Card>
  );
};

AnnouncementCard.defaulProps = {
  title: "unknown",
  content: "p",
};

const COUNT = 5;

const AnnouncementSkeleton = props => (
  <Skeleton variant="rect" height={118} style={{ marginTop: "8px" }} {...props} />
);

const renderAnnouncementSkeleton = (n = COUNT) =>
  Array(n)
    .fill(0)
    .map((_, index) => <AnnouncementSkeleton key={index} />);

const Announcement = props => {
  const classes = useStyles();
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
    "announcements",
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://sipema.herokuapp.com/b/announcement/get/${pageParam}/${COUNT}`,
      );
      return await res.json();
    },
    {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.announcements.length < COUNT
          ? false
          : allPages.reduce((acc, curr) => acc + curr.announcements.length, 0);
      },
    },
  );

  const announcements = data?.pages.reduce((acc, curr) => {
    acc.push(...curr.announcements);
    return acc;
  }, []);

  useIntersectionObserver({
    target: sentinelEnd,
    onIntersect: () => fetchNextPage(),
    enabled: hasNextPage,
  });

  return (
    <>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Announcement {data && isFetching && !isFetchingNextPage && <CircularProgress size={16} />}
      </Typography>
      {!data && renderAnnouncementSkeleton()}
      {announcements?.map((announcement, index) => (
        <AnnouncementCard {...announcement} key={index} />
      ))}
      {isFetchingNextPage && renderAnnouncementSkeleton(2)}
      {!isFetchingNextPage && <div className="sentinel-end" ref={sentinelEnd}></div>}
      {/* {data && !hasNextPage && <Typography align="center">Tidak ada pengumuman lagi...</Typography>} */}
    </>
  );
};

export default memo(Announcement);
