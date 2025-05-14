import React, { useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Chart from 'chart.js/auto';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

// Register the matrix controller and element
Chart.register(MatrixController, MatrixElement);

const CourseProgressPage = ({lessons}) => {
  const chartRef = useRef(null);

 

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Course Progress',
          data: lessons.map((lesson, index) => ({
            x: index,
            y: 0,
            v: lesson.mark,
          })),
          backgroundColor(context) {
            const value = context.dataset.data[context.dataIndex].v;
            const alpha = (value - 1) /4;
            return `rgba(0, 151, 230, ${alpha})`;
          },
          width: ({ chart }) => (chart.chartArea || {}).width / lessons.length - 10,
          height: ({ chart, dataIndex }) => {
            const value = chart.data.datasets[0].data[dataIndex].v;
            return (chart.chartArea || {}).height * (value / 5);
          },
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: lessons.map(lesson => lesson.name),
            offset: true,
            ticks: { font: { size: 14 } }
          },
          y: {
            type: 'category',
            labels: ['Marks'],
            ticks: { font: { size: 14 } }
          } 
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => '',
              label: context => `Lesson: ${lessons[context.dataIndex].name}, Mark: ${context.raw.v}%`,
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [lessons]);

  return (
    <Box mt={8} width="100%" maxWidth="800px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
        Course Progress Heatmap
      </Text>
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default CourseProgressPage;
