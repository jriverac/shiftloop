import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Graph.css';

const Graph = ({ peopleList, weekendDaysPerPerson, mean, stdDev }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !peopleList.length) {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
      return;
    }

    generateBellCurve();
  }, [peopleList, weekendDaysPerPerson, mean, stdDev]);
  
  const generateBellCurve = () => {
    if (!chartRef.current) return;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Generate data
    const data = [];
    const meanVal = mean;
    const stdVal = stdDev;
    
    // Generate normal distribution data
    for (let i = 0; i < 1000; i++) {
      const q = meanVal + stdVal * d3.randomNormal()();
      const p = gaussian(q, meanVal, stdVal);
      data.push({ q: q, p: p });
    }
    
    data.sort((a, b) => a.q - b.q);
    
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 280 - margin.top - margin.bottom;
    
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.q))
      .range([0, width]);
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.p))
      .range([height, 0]);
    
    // Line generator
    const line = d3.line()
      .x(d => xScale(d.q))
      .y(d => yScale(d.p))
      .curve(d3.curveCardinal);
    
    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('.0f'));
    
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format('.2f'));
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', 'black')
      .text('Weekend Call Days');
    
    // Add Y axis
    svg.append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', 'black')
      .text('Probability Density');
    
    // Add the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0066cc')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add markers for each person's actual weekend days
    if (weekendDaysPerPerson && weekendDaysPerPerson.length > 0) {
      peopleList.forEach((person, idx) => {
        const weekendDays = weekendDaysPerPerson[idx];
        const yValue = gaussian(weekendDays, meanVal, stdVal);

        // Add circle marker
        svg.append('circle')
          .attr('cx', xScale(weekendDays))
          .attr('cy', yScale(yValue))
          .attr('r', 6)
          .attr('fill', person.color)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .append('title')
          .text(`${person.name}: ${weekendDays} days`);
      });
    }
  };
  
  // Gaussian probability density function
  const gaussian = (x, mean, sigma) => {
    const gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    x = (x - mean) / sigma;
    return (gaussianConstant * Math.exp(-0.5 * x * x)) / sigma;
  };
  
  const renderLegend = () => {
    return (
      <div className="legend">
        {peopleList.map((person, idx) => (
          <div key={idx} className="legend-item">
            <span 
              className="legend-color"
              style={{ backgroundColor: person.color }}
            ></span>
            <span>{person.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bell-curve-chart-container">
      <h2 className="h4 mb-3">Standard Deviation Chart</h2>
      <div className="d-flex">
        <div className="chart-area">
          <div ref={chartRef}></div>
        </div>
        {peopleList.length > 0 && (
          <div className="ms-3">
            {renderLegend()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;