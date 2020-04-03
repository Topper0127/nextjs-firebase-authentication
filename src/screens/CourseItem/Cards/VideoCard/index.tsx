import React from 'react';
import styled from 'styled-components';
import { Modal, Icon } from 'antd';
import ReactPlayer from 'react-player';

import { CurriculumItem } from '@generated/client';
import Link from '@components/Link';

import { StyledCard } from '../../styles';

const StyledModal = styled(Modal)`
  min-width: 640px;
  min-height: 360px;

  .ant-modal-body {
    width: 640px;
    height: 360px;
    padding: 0;
    margin: 0;
  }
`;

type VideoCardProps = {
  item: CurriculumItem;
};

const VideoCard = ({ item }: VideoCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  let actions = [
    <>
      <StyledModal
        centered
        footer={null}
        closable={false}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <ReactPlayer playing={isOpen} controls url={item.url || ''} />
      </StyledModal>

      <a onClick={() => setIsOpen(true)}>Watch</a>
    </>,
  ];

  if (item.secondaryUrl) {
    actions = actions.concat(
      <Link href={item.secondaryUrl}>More</Link>
    );
  }

  return (
    <StyledCard
      title={
        <>
          <Icon type="video-camera" /> {item.label}
        </>
      }
      actions={actions}
    >
      {item.description}
    </StyledCard>
  );
};

export default VideoCard;
