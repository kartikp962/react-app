import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'

function Component1() {
  const [apiDatas, setApiDatas] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      setApiDatas(data);
    })
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200
    },
    {
      field: 'body',
      headerName: 'Body',
      width: 400
    },
  ]

  return (
    <div style={{height: 400, width: '100%'}}>
        {/* <h1>Posts</h1>
        {apiDatas.map(apiData => (
          <div key={apiData.id}>
            <h2>{apiData.title}</h2>
            <p>{apiData.body}</p>
          </div>
        ))} */}

        <DataGrid rows={apiDatas} columns={columns} pageSize={5} />
    </div>
  )
}

export default Component1