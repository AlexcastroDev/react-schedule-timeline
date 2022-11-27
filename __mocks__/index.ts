const db = new Array(100).fill(0).map(() => {
  return {
    id: '1',
    title: 'iPhone',
    data: [
      {
        start_at: '2022-11-07T23:59:59',
        end_at: '2022-11-09T12:00:00',
      },
      {
        start_at: '2022-11-09T12:00:00',
        end_at: '2022-11-12T23:00:00',
      },
    ],
  }
})

const db2 = [
  {
    id: '1',
    title: 'iPhone',
    data: [
      {
        start_at: '2022-11-01T00:00:00',
        end_at: '2022-11-09T04:00:00',
      },
      {
        start_at: '2022-11-09T02:00:00',
        end_at: '2022-11-20T06:00:00',
      },
      {
        start_at: '2022-11-14T04:00:00',
        end_at: '2022-11-17T07:00:00',
      },
      {
        start_at: '2022-11-01T03:00:00',
        end_at: '2022-11-30T06:00:00',
      },
    ],
  },
]

const db3 = {
  id: '1',
  title: 'iPhone',
  data: new Array(100).fill(0).map(() => ({
    start_at: '2022-11-07T23:59:59',
    end_at: '2022-11-09T12:00:00',
  })),
}

const db4 = new Array(15).fill(0).map(() => ({
  id: '1',
  title: 'iPhone',
  data: [
    {
      start_at: '2022-11-01T08:00:00',
      end_at: '2022-11-09T04:00:00',
    },
    {
      start_at: '2022-11-09T02:00:00',
      end_at: '2022-11-20T06:00:00',
    },
    {
      start_at: '2022-11-09T04:00:00',
      end_at: '2022-11-20T06:00:00',
    },
    {
      start_at: '2022-11-14T08:00:00',
      end_at: '2022-11-17T09:00:00',
    },
  ],
}))

const db5 = new Array(100).fill(0).map(() => ({
  id: '1',
  title: 'iPhone',
  data: [
    {
      start_at: '2022-11-01T08:00:00',
      end_at: '2022-11-02T20:00:00',
    },
  ],
}))

export default db5
