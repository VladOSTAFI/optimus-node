import React, { useMemo } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { INode, NodeStatuses, PROJECTS } from '@/common';

interface NodeListItemProps {
  node: INode;

  onRun: () => void;
  onDelete: () => void;
}

const NodeListItem: React.FC<NodeListItemProps> = (props) => {
  const projectName = useMemo(
    () => PROJECTS.find((project) => project.id === props.node.projectId)?.name,
    [props.node.projectId],
  );

  const showRunBtn = useMemo(
    () =>
      props.node.status === NodeStatuses.INSTALLED ||
      props.node.status === NodeStatuses.STOPPED,
    [props.node.status],
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
        <IconButton aria-label="delete" size="small" onClick={props.onDelete}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        {showRunBtn && (
          <IconButton aria-label="run" size="small" onClick={props.onRun}>
            <PlayArrowIcon fontSize="inherit" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default NodeListItem;
