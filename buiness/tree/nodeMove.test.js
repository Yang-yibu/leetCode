import { moveNode } from './nodeMove';

const ov = [
  {
    id: 1,
    name: '1',
    children: [
      { id: '1-1', name: '1-1' },
      { id: '1-2', name: '1-2' },
      { id: '1-3', name: '1-3' },
    ],
  },
  {
    id: 2,
    name: '2',
    children: [
      { id: '2-1', name: '2-1' },
      { id: '2-2', name: '2-2' },
    ],
  },
];
const ovs = JSON.stringify(ov);

test('升级', () => {
  expect(moveNode(JSON.parse(ovs), [0, 0], 'levelUp')).toEqual([
    {
      id: 1,
      name: '1',
    },
    {
      id: '1-1',
      name: '1-1',
      hierarchyState: 'expand',
      children: [
        { id: '1-2', name: '1-2' },
        { id: '1-3', name: '1-3' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 1], 'levelUp')).toEqual([
    {
      id: 1,
      name: '1',
      children: [{ id: '1-1', name: '1-1' }],
    },
    {
      id: '1-2',
      name: '1-2',
      hierarchyState: 'expand',
      children: [{ id: '1-3', name: '1-3' }],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 2], 'levelUp')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-2', name: '1-2' },
      ],
    },
    { id: '1-3', name: '1-3' },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);

  expect(moveNode(JSON.parse(ovs), [0], 'levelUp')).toEqual('stop');
});

test('降级', () => {
  expect(moveNode(JSON.parse(ovs), [0, 0], 'levelDown')).toEqual('stop');
  expect(moveNode(JSON.parse(ovs), [0, 1], 'levelDown')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        {
          id: '1-1',
          name: '1-1',
          hierarchyState: 'expand',
          children: [{ id: '1-2', name: '1-2' }],
        },
        { id: '1-3', name: '1-3' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 2], 'levelDown')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        {
          id: '1-1',
          name: '1-1',
        },
        {
          id: '1-2',
          name: '1-2',
          hierarchyState: 'expand',
          children: [{ id: '1-3', name: '1-3' }],
        },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [1], 'levelDown')).toEqual([
    {
      id: 1,
      name: '1',
      // 当前节点如果闭合的话，也要展开
      hierarchyState: 'expand',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-2', name: '1-2' },
        { id: '1-3', name: '1-3' },
        {
          id: 2,
          name: '2',
          children: [
            { id: '2-1', name: '2-1' },
            { id: '2-2', name: '2-2' },
          ],
        },
      ],
    },
  ]);

  expect(moveNode(JSON.parse(ovs), [0], 'levelDown')).toEqual('stop');
});

test('上移', () => {
  expect(moveNode(JSON.parse(ovs), [0, 0], 'up')).toEqual('stop');

  expect(moveNode(JSON.parse(ovs), [0, 1], 'up')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-2', name: '1-2' },
        { id: '1-1', name: '1-1' },
        { id: '1-3', name: '1-3' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 2], 'up')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-3', name: '1-3' },
        { id: '1-2', name: '1-2' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);

  expect(moveNode(JSON.parse(ovs), [1], 'up')).toEqual([
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-2', name: '1-2' },
        { id: '1-3', name: '1-3' },
      ],
    },
  ]);
});

test('下移', () => {
  expect(moveNode(JSON.parse(ovs), [0, 0], 'down')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-2', name: '1-2' },
        { id: '1-1', name: '1-1' },
        { id: '1-3', name: '1-3' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 1], 'down')).toEqual([
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-3', name: '1-3' },
        { id: '1-2', name: '1-2' },
      ],
    },
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [0, 2], 'down')).toEqual('stop');

  expect(moveNode(JSON.parse(ovs), [0], 'down')).toEqual([
    {
      id: 2,
      name: '2',
      children: [
        { id: '2-1', name: '2-1' },
        { id: '2-2', name: '2-2' },
      ],
    },
    {
      id: 1,
      name: '1',
      children: [
        { id: '1-1', name: '1-1' },
        { id: '1-2', name: '1-2' },
        { id: '1-3', name: '1-3' },
      ],
    },
  ]);
  expect(moveNode(JSON.parse(ovs), [1], 'down')).toEqual('stop');
});
