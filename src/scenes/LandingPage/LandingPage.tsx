import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'antd';

import MainLayout from 'layouts/MainLayout';
import Button from 'components/Button/Button';

import carousel1 from 'assets/images/carousel-1.jpg';
import carousel2 from 'assets/images/carousel-2.jpg';
import carousel3 from 'assets/images/carousel-3.jpg';

import './landing-page.scss';

export default function LandingPage(): ReactElement {
  const history = useHistory();
  const onNavigate = (): void => {
    history.push('/players');
  }

  return (
    <MainLayout>
      <div className='landing-page'>
        <Carousel 
          autoplay
          autoplaySpeed={5000}
          className='carousel'
        >
          {[carousel3, carousel2, carousel1].map((item, index) => 
            <img
              src={item} 
              alt={`carousel-${index}`}
              key={`carousel-${index}`}
              className='image'
            />
          )}
        </Carousel>
        <div className='text'>
          <h1>See Player's Stats</h1>
          <Button text='View Players' type='primary' onClick={onNavigate} />
        </div>
      </div>
    </MainLayout>
  )
}
