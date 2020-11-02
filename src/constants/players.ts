export const playersColumn = [
  {
    title: 'Name',
    dataIndex: 'first_name',
    key: 'name',
    sorter: true,
    render: (text: any, record: any) => `${record.first_name} ${record.last_name}`  
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    sorter: true,
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    render: (team: any) => team.name,
    sorter: true
  },
];
