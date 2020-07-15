import { PlusOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import { YoutubeResponseItem } from '../../api/api';
import ReactPlayer from 'react-player';

interface Props {
  items: YoutubeResponseItem[];
  onPlaylistAdd: (url: string, title: string, channelTitle: string, thumbnailUrl: string) => void;
}

export const VideoSearchList = (props: Props) => {
  const { items, onPlaylistAdd } = props;

  const data = _.map(items, (item) => {
    const url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    return {
      url: url,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      onPlaylistAdd: () =>
        onPlaylistAdd(
          url,
          item.snippet.title,
          item.snippet.channelTitle,
          item.snippet.thumbnails.medium.url,
        ),
    };
  });

  const playableData = _.filter(data, (item) => ReactPlayer.canPlay(item.url));

  const list = (
    <List
      dataSource={playableData}
      itemLayout="vertical"
      bordered
      renderItem={(item) => (
        <List.Item
          actions={[
            <Space>
              <span onClick={item.onPlaylistAdd}>
                <PlusOutlined />
                Add to playlist
              </span>
            </Space>,
          ]}
        >
          <List.Item.Meta
            avatar={<img src={item.thumbnail} style={{ width: '120px' }} />}
            title={item.title}
            description={item.channelTitle}
          />
        </List.Item>
      )}
    />
  );

  return <div>{list}</div>;
};
