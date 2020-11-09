import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'antd';

import MainLayout from 'layouts/MainLayout';
import TextImage from 'components/Image/TextImage';
import Button from 'components/Button/Button';

import carousel1 from 'assets/images/carousel-1.jpg';
import carousel2 from 'assets/images/carousel-2.jpg';
import carousel3 from 'assets/images/carousel-3.jpg';

export default function LandingPage(): ReactElement {
  const history = useHistory();
  const onNavigate = (): void => {
    history.push('/players');
  }

  return (
    <MainLayout>
      <Carousel 
        autoplay
        autoplaySpeed={5000}
      >
        {[carousel3, carousel2, carousel1].map((item, index) => 
          <TextImage 
            key={`carousel-item-${index}`}
            src={item}
            text="See Player's Stats"
            button={<Button text='View Players' type='primary' onClick={onNavigate} />}
          />
        )}
      </Carousel>
    </MainLayout>
  )
}
