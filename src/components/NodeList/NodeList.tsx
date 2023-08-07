import React from 'react';
import { Grid, Button, CircularProgress, Box, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { INode } from '@/common';
import NodeListItem from '../NodeListItem/NodeListItem';

interface NodeListProps {
  nodes: INode[];
  loading?: boolean;
  isServerSelected?: boolean;

  onAddNode?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NodeList: React.FC<NodeListProps> = (props) => {
  if (props.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (props.nodes.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {props.isServerSelected ? (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>No nodes in current server</Typography>
            <Button
              onClick={props.onAddNode}
              variant="outlined"
              startIcon={<AddCircleIcon />}
            >
              Add Node
            </Button>
          </>
        ) : (
          <Typography variant="h6">Select server from server list</Typography>
        )}
      </Box>
    );
  }

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
