import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { renderBody } from "../../../utils";

import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import moment from "moment";

const AnnouncementSkeleton = () => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circle" height={42} width={42} />
        <Skeleton variant="rect" width={160} height={24} style={{ marginLeft: 20 }} />
      </Box>
      <Box mt={4}>
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="rect" fullWidth height={24} style={{ marginBottom: 8 }} />
      </Box>
    </>
  );
};

const AnnouncementView = () => {
  let { announcementId } = useParams();

  const { isLoading, error, data, isFetching } = useQuery(
    `announcement-${announcementId}`,
    () =>
      fetch(`https://sipema.herokuapp.com/b/announcement/detail/${announcementId}`).then(res =>
        res.json(),
      ),
    { refetchOnWindowFocus: false },
  );

  if (isLoading) return <AnnouncementSkeleton />;

  if (error) return <div>something went wrong...</div>;
  console.log(data);
  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={data.teacher.pp} />
        <div style={{ marginLeft: 16 }}>
          <Typography>{data.teacher.fullname}</Typography>
          <Typography variant="body2" color="textSecondary">
            {moment.unix(data.created).format("llll")}
          </Typography>
        </div>
      </Box>
      <Typography variant="h5" align="center" style={{ marginBottom: 24 }}>
        {data.title}
      </Typography>
      <Typography variant="body1" align="justify">
        {renderBody(data.body)}
      </Typography>
    </>
  );
};

export default AnnouncementView;
