import React, { useMemo } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { INode, PROJECTS } from '@/common';

interface NodeListItemProps {
  node: INode;
}

const NodeListItem: React.FC<NodeListItemProps> = (props) => {
  const projectName = useMemo(
    () => PROJECTS.find((project) => project.id === props.node.projectId)?.name,
    [props.node.projectId],
  );

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {projectName}
        </Typography>
        <Typography variant="h5" component="div">
          {props.node.name}
        </Typography>
        <Typography variant="caption" component="span">
          Node status: {props.node.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Update</Button>
      </CardActions>
    </Card>
  );
};

export default NodeListItem;
