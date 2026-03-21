import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const listId = searchParams.get('listId')
    
    const whereClause = listId ? { listId } : {}
    
    const items = await db.inventoryItem.findMany({
      where: whereClause,
      include: {
        company: true,
        category: true,
        product: {
          include: {
            company: true,
            category: true
          }
        },
        list: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get list name if filtering by list
    let listName = 'All Items'
    if (listId) {
      const list = await db.inventoryList.findUnique({ where: { id: listId } })
      if (list) listName = list.name
    }

    // Calculate statistics
    const totalItems = items.length
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalIncoming = items.reduce((sum, item) => sum + item.incomingQty, 0)
    const totalOutgoing = items.reduce((sum, item) => sum + item.outgoingQty, 0)
    const totalPowerKw = items.reduce((sum, item) => sum + (item.powerKw || 0), 0)
    
    // Group by category
    const categoryStats = items.reduce((acc, item) => {
      const catName = item.category?.name || item.product?.category?.name || 'Other'
      acc[catName] = (acc[catName] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Group by company
    const companyStats = items.reduce((acc, item) => {
      const compName = item.company?.name || item.product?.company?.name || 'Other'
      acc[compName] = (acc[compName] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const currentDate = new Date()
    const reportDate = currentDate.toLocaleDateString('en-US')
    const reportTime = currentDate.toLocaleTimeString('en-US')

    // Generate HTML for PDF
    const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>Inventory Report - ${listName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background: #fff;
      color: #333;
      line-height: 1.6;
      padding: 0;
    }
    
    /* Header Section */
    .header {
      background: linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%);
      color: white;
      padding: 30px 40px;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L60 30 L80 30 L65 45 L70 65 L50 52 L30 65 L35 45 L20 30 L40 30 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E") repeat;
      opacity: 0.3;
    }
    
    .header-content {
      position: relative;
      z-index: 1;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .header h1::before {
      content: '⚡';
      font-size: 32px;
    }
    
    .list-badge {
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    
    .header-meta {
      display: flex;
      gap: 30px;
      font-size: 14px;
      opacity: 0.9;
      margin-top: 10px;
    }
    
    .header-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    /* Main Content */
    .content {
      padding: 30px 40px;
    }
    
    /* Stats Section */
    .stats-section {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .stat-card {
      background: linear-gradient(145deg, #f8f9fa, #ffffff);
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 20px 15px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
    }
    
    .stat-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #1F4E79;
      margin-bottom: 4px;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      font-weight: 500;
    }
    
    .stat-card.incoming .stat-value { color: #28a745; }
    .stat-card.outgoing .stat-value { color: #dc3545; }
    .stat-card.power .stat-value { color: #fd7e14; }
    
    /* Charts Section */
    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .chart-card {
      background: #fff;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    
    .chart-card h3 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #1F4E79;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .chart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .chart-item:last-child {
      border-bottom: none;
    }
    
    .chart-item-name {
      font-size: 13px;
      color: #333;
    }
    
    .chart-item-bar {
      flex: 1;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      margin: 0 15px;
      overflow: hidden;
    }
    
    .chart-item-fill {
      height: 100%;
      background: linear-gradient(90deg, #1F4E79, #2E75B6);
      border-radius: 4px;
      transition: width 0.3s;
    }
    
    .chart-item-count {
      font-size: 14px;
      font-weight: 600;
      color: #1F4E79;
      min-width: 40px;
      text-align: left;
    }
    
    /* Table Section */
    .table-section {
      margin-top: 30px;
    }
    
    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    
    .table-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .table-header h2::before {
      content: '📋';
    }
    
    .items-count {
      background: #1F4E79;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    thead {
      background: linear-gradient(135deg, #1F4E79 0%, #2E75B6 100%);
    }
    
    th {
      color: white;
      padding: 14px 8px;
      text-align: right;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    
    td {
      padding: 12px 8px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: middle;
    }
    
    tbody tr:nth-child(even) {
      background: #f8f9fa;
    }
    
    tbody tr:hover {
      background: #e8f4fd;
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-left {
      text-align: left;
    }
    
    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
    }
    
    .badge-company {
      background: #e3f2fd;
      color: #1565c0;
    }
    
    .badge-category {
      background: #f3e5f5;
      color: #7b1fa2;
    }
    
    .badge-kw {
      background: linear-gradient(135deg, #ffc107, #ff9800);
      color: #000;
      font-weight: 700;
    }
    
    .badge-model {
      font-family: 'Consolas', 'Monaco', monospace;
      background: #f5f5f5;
      color: #333;
      font-size: 9px;
    }
    
    .badge-incoming {
      background: #e8f5e9;
      color: #2e7d32;
    }
    
    .badge-outgoing {
      background: #ffebee;
      color: #c62828;
    }
    
    /* Footer */
    .footer {
      margin-top: 40px;
      padding: 20px 40px;
      background: #f8f9fa;
      border-top: 1px solid #e9ecef;
      text-align: center;
    }
    
    .footer p {
      font-size: 11px;
      color: #666;
      margin-bottom: 5px;
    }
    
    .footer .powered-by {
      font-size: 12px;
      color: #1F4E79;
      font-weight: 600;
    }
    
    /* Print Styles */
    @media print {
      body { 
        print-color-adjust: exact; 
        -webkit-print-color-adjust: exact; 
      }
      .stat-card, .chart-card, table {
        break-inside: avoid;
      }
      thead {
        break-after: avoid;
      }
      tr {
        break-inside: avoid;
      }
      @page {
        margin: 10mm;
        size: A4 landscape;
      }
    }
    
    /* Page break */
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="header-content">
      <h1>Electrical Equipment Inventory Report <span class="list-badge">${listName}</span></h1>
      <div class="header-meta">
        <span>📅 Report Date: ${reportDate}</span>
        <span>🕐 Time: ${reportTime}</span>
        <span>📄 Total Items: ${totalItems}</span>
      </div>
    </div>
  </div>
  
  <!-- Content -->
  <div class="content">
    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-value">${totalItems}</div>
        <div class="stat-label">Total Items</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-value">${totalQuantity}</div>
        <div class="stat-label">Total Quantity</div>
      </div>
      <div class="stat-card incoming">
        <div class="stat-icon">📥</div>
        <div class="stat-value">${totalIncoming}</div>
        <div class="stat-label">Total Incoming</div>
      </div>
      <div class="stat-card outgoing">
        <div class="stat-icon">📤</div>
        <div class="stat-value">${totalOutgoing}</div>
        <div class="stat-label">Total Outgoing</div>
      </div>
      <div class="stat-card power">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${totalPowerKw.toFixed(1)}</div>
        <div class="stat-label">Total Power (kW)</div>
      </div>
    </div>
    
    <!-- Charts Section -->
    <div class="charts-section">
      <div class="chart-card">
        <h3>📊 Distribution by Type</h3>
        ${Object.entries(categoryStats).slice(0, 8).map(([name, count]) => {
          const percentage = totalItems > 0 ? (count / totalItems) * 100 : 0
          return `
            <div class="chart-item">
              <span class="chart-item-name">${name}</span>
              <div class="chart-item-bar">
                <div class="chart-item-fill" style="width: ${percentage}%"></div>
              </div>
              <span class="chart-item-count">${count}</span>
            </div>
          `
        }).join('')}
      </div>
      
      <div class="chart-card">
        <h3>🏭 Distribution by Company</h3>
        ${Object.entries(companyStats).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => {
          const percentage = totalItems > 0 ? (count / totalItems) * 100 : 0
          return `
            <div class="chart-item">
              <span class="chart-item-name">${name}</span>
              <div class="chart-item-bar">
                <div class="chart-item-fill" style="width: ${percentage}%"></div>
              </div>
              <span class="chart-item-count">${count}</span>
            </div>
          `
        }).join('')}
      </div>
    </div>
    
    <!-- Table Section -->
    <div class="table-section">
      <div class="table-header">
        <h2>Inventory Details</h2>
        <span class="items-count">${items.length} items</span>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Cond.</th>
            <th>Company</th>
            <th>Type</th>
            <th>Model</th>
            <th>Amp</th>
            <th>Volt</th>
            <th>Phase</th>
            <th>kW</th>
            <th>Qty</th>
            <th>In</th>
            <th>Out</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item, index) => `
            <tr>
              <td class="text-center">${index + 1}</td>
              <td><strong>${item.name}</strong></td>
              <td><span class="badge ${item.condition === 'new' ? 'badge-incoming' : 'badge-outgoing'}">${item.condition === 'new' ? 'New' : 'Used'}</span></td>
              <td><span class="badge badge-company">${item.company?.name || item.product?.company?.name || '-'}</span></td>
              <td><span class="badge badge-category">${item.category?.name || item.product?.category?.name || '-'}</span></td>
              <td><span class="badge badge-model">${item.product?.model || '-'}</span></td>
              <td class="text-center">${item.amperage || '-'}</td>
              <td class="text-center">${item.voltage || '-'}</td>
              <td class="text-center">${item.phases ? `${item.phases}φ` : '-'}</td>
              <td class="text-center">${item.powerKw ? `<span class="badge badge-kw">${item.powerKw} kW</span>` : '-'}</td>
              <td class="text-center"><strong>${item.quantity}</strong></td>
              <td class="text-center"><span class="badge badge-incoming">${item.incomingQty}</span></td>
              <td class="text-center"><span class="badge badge-outgoing">${item.outgoingQty}</span></td>
              <td>${item.location || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="footer">
    <p class="powered-by">⚡ Electrical Equipment Inventory System</p>
    <p>Report generated automatically - All rights reserved © ${currentDate.getFullYear()}</p>
  </div>
</body>
</html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      }
    })
  } catch (error) {
    console.error('Error exporting to PDF:', error)
    return NextResponse.json({ error: 'Failed to export to PDF' }, { status: 500 })
  }
}
