import React from 'react';
import { Grid, Button, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { INode } from '@/common';
import NodeListItem from '../NodeListItem/NodeListItem';

interface NodeListProps {
  nodes: INode[];

  onAddNode?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NodeList: React.FC<NodeListProps> = (props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {props.nodes.map((node) => (
        <Grid item xs={2} sm={4} md={4} key={node.id}>
          <NodeListItem node={node} />
        </Grid>
      ))}
      <Grid item xs={2} sm={4} md={4}>
        <Button
          onClick={props.onAddNode}
          variant="outlined"
          startIcon={<AddCircleIcon />}
        >
          Add Node
        </Button>
      </Grid>
    </Grid>
  );
};

export default NodeList;
