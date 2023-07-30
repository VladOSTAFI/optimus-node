import React from 'react';
import { Menu, MenuItem } from '@mui/material';

import { PROJECTS, ProjectIds } from '@/common';

const DISABLED_NODES = [
  ProjectIds.Gear,
  ProjectIds.Holograph,
  ProjectIds.Shardeum,
];

interface NodeMenuProps
  extends Omit<React.ComponentProps<typeof Menu>, 'onSelect'> {
  onSelect: (id: ProjectIds) => void;
}

const NodeMenu: React.FC<NodeMenuProps> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {PROJECTS.map((project) => (
        <MenuItem
          key={project.id}
          onClick={() => props.onSelect(project.id)}
          disabled={DISABLED_NODES.includes(project.id)}
        >
          {project.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NodeMenu;
