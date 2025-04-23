import { useState } from 'react';
import './App.css';

// Custom Simple Pie Chart Component
function SimplePieChart({ data, totalLabel }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="pie-chart-container">
      <div className="pie-chart">
        <svg viewBox="0 0 100 100">
          {data.map((segment, index) => {
            // Calculate each segment's percentage
            const percentage = (segment.value / total) * 100;
            // For simple donut chart - we'll create a stroke dash array
            const circumference = 2 * Math.PI * 35; // radius is 35
            const offset = circumference - (percentage / 100) * circumference;

            // Calculate rotation for each segment
            let rotation = 0;
            for (let i = 0; i < index; i++) {
              rotation += (data[i].value / total) * 360;
            }

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={segment.color}
                strokeWidth="15"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(${rotation - 90} 50 50)`}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            );
          })}
        </svg>
        <div className="pie-chart-center">
          <div className="pie-chart-value">{total}</div>
          <div className="pie-chart-label">{totalLabel}</div>
        </div>
      </div>
    </div>
  );
}

// Alert Triangle Icon Component
function AlertTriangleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

// Main Dashboard Component
export default function App() {
  const [timeRange, setTimeRange] = useState('Last 2 days');

  // Cloud Accounts data
  const cloudAccountsData = [
    { name: 'Connected', value: 2, color: '#4285F4' },
    { name: 'Not Connected', value: 2, color: '#E8EAED' }
  ];

  // Cloud Account Risk Assessment data
  const riskAssessmentData = [
    { name: 'Failed', value: 1689, color: '#EA4335' },
    { name: 'Warning', value: 681, color: '#FBBC04' },
    { name: 'Not available', value: 310, color: '#9AA0A6' },
    { name: 'Passed', value: 7279, color: '#34A853' }
  ];

  // Image Risk Assessment data
  const totalVulnerabilities = 1470;
  const criticalVulnerabilities = 4;
  const highVulnerabilities = 160;

  // Image Security Issues data
  const totalImages = 2;
  const criticalImages = 2;
  const highImages = 2;

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>CNAPP Dashboard</h1>
            <h2>CSPM Executive Dashboard</h2>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-add">
              Add Widget <span>+</span>
            </button>
            <button className="btn btn-icon">?</button>
            <button className="btn btn-icon">!</button>
            <div className="time-range-selector">
              <span>{timeRange}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </div>

        {/* First Row */}
        <div className="dashboard-row">
          {/* Cloud Accounts Widget */}
          <div className="dashboard-widget">
            <h3 className="widget-title">Cloud Accounts</h3>
            <div className="widget-content">
              <SimplePieChart data={cloudAccountsData} totalLabel="Total" />
              <div className="widget-legend">
                {cloudAccountsData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cloud Account Risk Assessment Widget */}
          <div className="dashboard-widget">
            <h3 className="widget-title">Cloud Account Risk Assessment</h3>
            <div className="widget-content">
              <SimplePieChart data={riskAssessmentData} totalLabel="Total" />
              <div className="widget-legend">
                {riskAssessmentData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-label">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="widget-footer">
              <button className="btn btn-add-widget">
                Add Widget <span>+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="dashboard-row">
          {/* Top 5 Namespace Specific Alerts */}
          <div className="dashboard-widget">
            <h3 className="widget-title">CWPP Dashboard:</h3>
            <h4 className="widget-subtitle">Top 5 Namespace Specific Alerts</h4>
            <div className="no-data">
              <AlertTriangleIcon />
              <p>No Graph data available!</p>
            </div>
          </div>

          {/* Workload Alerts */}
          <div className="dashboard-widget">
            <h3 className="widget-title">Workload Alerts</h3>
            <div className="no-data">
              <AlertTriangleIcon />
              <p>No Graph data available!</p>
            </div>
            <div className="widget-footer">
              <button className="btn btn-add-widget">
                Add Widget <span>+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="dashboard-row">
          {/* Image Risk Assessment */}
          <div className="dashboard-widget">
            <h3 className="widget-title">Registry Scan</h3>
            <h4 className="widget-subtitle">Image Risk Assessment</h4>
            <div className="vulnerability-stats">
              <div className="vulnerability-header">
                <span>{totalVulnerabilities} total vulnerabilities</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-section critical" style={{ width: `${(criticalVulnerabilities / totalVulnerabilities) * 100}%` }}></div>
                  <div className="progress-section high" style={{ width: `${(highVulnerabilities / totalVulnerabilities) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <div className="widget-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#EA4335' }}></div>
                <span className="legend-label">Critical ({criticalVulnerabilities})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#FBBC04' }}></div>
                <span className="legend-label">High ({highVulnerabilities})</span>
              </div>
            </div>
          </div>

          {/* Image Security Issues */}
          <div className="dashboard-widget">
            <h3 className="widget-title">Image Security Issues</h3>
            <div className="vulnerability-stats">
              <div className="vulnerability-header">
                <span>{totalImages} total images</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-section critical" style={{ width: `${(criticalImages / totalImages) * 100}%` }}></div>
                  <div className="progress-section high" style={{ width: `${(highImages / totalImages) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <div className="widget-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#EA4335' }}></div>
                <span className="legend-label">Critical ({criticalImages})</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#FBBC04' }}></div>
                <span className="legend-label">High ({highImages})</span>
              </div>
            </div>
            <div className="widget-footer">
              <button className="btn btn-add-widget">
                Add Widget <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}