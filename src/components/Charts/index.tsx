import React, { useEffect, useState } from 'react';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js';
import { RootState } from '@core';
import { Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchAnimalsStatisticsAsync, FetchFeatureStatisticsAsync } from 'src/core/data-management/redux/statistics';
import useTranslation from 'next-translate/useTranslation';

import './style.less';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Tooltip
);

const { Title } = Typography;

var myChart1: Chart;
var myChart2: Chart;

export const HomeChart = () => {
  const dispatch = useDispatch();
  const { lang, t } = useTranslation('common');
  const en = lang === 'en';
  const { animals_data, features_data } = useSelector((state: RootState) => state.Statistics);

  const [animal_statistics, setanimal_statistics] = useState<{
    labels: string[];
    datasets: [{ label: string; data: number[]; backgroundColor: string[]; borderWidth: number }];
  }>({ labels: [], datasets: [{ label: '', data: [], backgroundColor: [], borderWidth: 0 }] });

  const [feature_statistics, setfeature_statistics] = useState<{
    labels: string[];
    datasets: [{ label: string; data: number[]; backgroundColor: string[]; borderWidth: number }];
  }>({ labels: [], datasets: [{ label: '', data: [], backgroundColor: [], borderWidth: 0 }] });

  useEffect(() => {
    dispatch(FetchAnimalsStatisticsAsync());
    dispatch(FetchFeatureStatisticsAsync());
  }, []);

  useEffect(() => {
    if (window) {
      var ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
      myChart1 && myChart1.destroy();
      myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: animal_statistics,
        options: {
          scales: {
            xAxes: { ticks: { display: false } },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, [animal_statistics]);

  useEffect(() => {
    if (window) {
      var ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
      Chart.register(BarElement, LinearScale);
      myChart2 && myChart2.destroy();
      myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: feature_statistics,
        options: {
          scales: {
            xAxes: { ticks: { display: false } },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }, [feature_statistics]);

  useEffect(() => {
    //get data from animals statistics and map it
    let newlables: string[] = [];
    let newdata: number[] = [];
    for (let i = 0; i < animals_data?.length; i++) {
      newlables.push(en ? animals_data[i]?.['key:en'] : animals_data[i]?.['key:ar']);
      newdata.push(animals_data[i]?.value);
    }
    setanimal_statistics({
      labels: [...newlables],
      datasets: [
        {
          label: '',
          data: [...newdata],
          backgroundColor: ['#c19a4b', '#ffdb96', '#275E9F', '#9BB0BF', '#DE9D7A', '#504735'],
          borderWidth: 1,
        },
      ],
    });
  }, [animals_data, lang]);

  useEffect(() => {
    //get data from feature statistics and map it
    let newlables: string[] = [];
    let newdata: number[] = [];
    for (let i = 0; i < features_data?.length; i++) {
      newlables.push(en ? features_data[i]?.['key:en'] : features_data[i]?.['key:ar']);
      newdata.push(features_data[i]?.value);
    }
    setfeature_statistics({
      labels: [...newlables],
      datasets: [
        {
          label: '',
          data: [...newdata],
          backgroundColor: ['#8D6E6A', '#BEBA93', '#58777C', '#9FC6F9', '#020B1E', '#175D91'],
          borderWidth: 1,
        },
      ],
    });
  }, [features_data, lang]);

  return (
    <Row justify='center' style={{ padding: '20px' }} gutter={[24, 24]}>
      <Col md={12} xs={23}>
        <div className='container'>
          <Title level={2}>{t`Animals statistics`}</Title>
          {animals_data && <canvas id='myChart1'></canvas>}
        </div>
      </Col>
      <Col md={12} xs={23}>
        <div className='container'>
          <Title level={2}>{t`Feature statistics`}</Title>
          {features_data && myChart2 && <canvas id='myChart2'></canvas>}
        </div>
      </Col>
    </Row>
  );
};
