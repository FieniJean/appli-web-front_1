import React from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import StatusCard from '../components/statuscard/StatusCard'

import statusCards from '../assets/JsonData/status-card-data.json'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

const chartOptions={
  series:[{
    name:'Clients en ligne',
    data:[40,70,30,90,36,80,30,91,60]
  }, 
  {
    name:'Clients Enregistrés',
    data:[40,20,70,10,54, 16, 40, 20, 100]
  }],
   options: {
    color : ['#6ab04c', '#2988b9'],
    chart:{
    background: 'transparent'
    },
    dataLabels:{
    enabled:false
    },
    stroke:{
     curve:'smooth'
    },
     xaxis:{
      categories:['Jan','Fev','Mar','Avr','Mai','Jui','Jui','Aou', 'Sep']
    },
    legend:{
     position: 'top'
    },
    grid:{
      show:false
    }
   }
 }

const topCustomers={
  head: [
    'user',
    'total orders',
    'total spending'
  ],
  body: [
    {
        "username": "john doe",
        "order": "490",
        "price": "$15,870"
    },
    {
        "username": "frank iva",
        "order": "250",
        "price": "$12,251"
    },
    {
        "username": "anthony baker",
        "order": "120",
        "price": "$10,840"
    },
    {
        "username": "frank iva",
        "order": "110",
        "price": "$9,251"
    },
    {
        "username": "anthony baker",
        "order": "80",
        "price": "$8,840"
    }
  ]
}

const renderCustomerHead = (item, index)=>(
  <th key={index}>{item}</th>
)

const renderCustomerBody = (item, index)=>(
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
)

const latestOrders={
  header: [
    "order id",
    "user",
    "total price",
    "date",
    "status"
],
body: [
    {
        id: "#OD1711",
        user: "john doe",
        date: "17 Jun 2021",
        price: "$900",
        status: "shipping"
    },
    {
        id: "#OD1712",
        user: "frank iva",
        date: "1 Jun 2021",
        price: "$400",
        status: "paid"
    },
    {
        id: "#OD1713",
        user: "anthony baker",
        date: "27 Jun 2021",
        price: "$200",
        status: "pending"
    },
    {
        id: "#OD1712",
        user: "frank iva",
        date: "1 Jun 2021",
        price: "$400",
        status: "paid"
    },
    {
        id: "#OD1713",
        user: "anthony baker",
        date: "27 Jun 2021",
        price: "$200",
        status: "refund"
    }
  ]
}

const orderStatus={
  "shipping": "primary",
  "pending": "warning",
  "paid": "success",
  "refund": "danger"
}

const renderOrderHead=(item, index)=>(
  <th key={index}>{item}</th>
)

const renderOrderBody=(item,index)=>(
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status}/>
    </td>
  </tr>
)

const Drashboard = () => {
  return (
    <div>
       <h2 className="page-header">Tableau de bord</h2>
       <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCards.map((item,index)=>(
                <div className="col-6">
                  {/* status card header */}
                  {/* {item.title} */}
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* charts */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
              height='100%'
            />  
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3 >Meilleurs clients</h3>
            </div>
            <div className="card__body">
              {/* table */}
              <Table
                headData={topCustomers.head}
                renderHead={(item,index)=>renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index)=>renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>Voir tout</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Derniers Achats</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>Tout voir</Link>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Drashboard