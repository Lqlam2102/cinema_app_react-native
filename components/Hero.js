/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {baseURL} from '../config/Apis';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Text} from 'react-native';

const Container = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  bottom: 8px;
`;

const Banner = styled.Image`
  height: 135px;
  width: 100%;
`;

const Tags = styled.View`
  justify-content: center;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const MenuTag = styled.Text`
  color: #fff;
  padding: 0 8px;
  font-size: 13px;
`;

const Separator = styled.View`
  width: 3px;
  height: 3px;
  background-color: #e8e8e8;
  margin: 6px 0;
  border-radius: 3px;
`;

const MenuHero = styled.View`
  width: 90%;
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;

const TextButton = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-top: 3px;
`;

const Play = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  width: 142px;
  height: 32px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

const TextButtonPlay = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
`;

const Hero = ({user}) => {
  const navigation = useNavigation();
  const [inList, setInList] = useState(false);
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const slug = 'cau-be-mat-tich-phan-4';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseURL}/favorite?q=${slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          setResponse(json[0]);
          setInList(true);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error.message);
      });
  }, [user]);
  const setMyList = async () => {
    setInList(!inList);
    // const user = await AsyncStorage.getItem('@user');
    if (inList) {
      fetch(`${baseURL}/favorite/${response.id}/`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(json => {})
        .catch(error => {
          console.log(error.message);
        });
    } else {
      fetch(`${baseURL}/favorite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({
          slug: slug,
          data: data,
        }),
      })
        .then(res => res.json())
        .then(json => {
          setResponse(json);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };
  return (
    <Container>
      <Banner
        resizeMode="contain"
        source={{
          uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp',
        }}
      />
      <Tags>
        <MenuTag>VNUF TV</MenuTag>
        <Separator />
        <MenuTag>VNUF Shows</MenuTag>
        <Separator />
        <MenuTag>VNUF Horror</MenuTag>
      </Tags>
      <MenuHero>
        {inList ? (
          <Button activeOpacity={0.5} onPress={setMyList}>
            {/* <MaterialIcons name="format-list-bulleted" size={24} color="#fff" /> */}
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Feather name="check" size={25} color="white" />
            )}

            <TextButton>My List</TextButton>
          </Button>
        ) : (
          <Button activeOpacity={0.5} onPress={setMyList}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Ionicons name="add-outline" size={24} color="white" />
            )}
            <TextButton>My List</TextButton>
          </Button>
        )}

        <Play
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('MovieFullScreen', {
              // uri: data.episodes[0].server_data[0].link_m3u8,
              // thumb_url: data.movie.thumb_url,
              server_data: data.episodes[0].server_data,
              thumb_url: data.movie.thumb_url,
              slug: data.movie.slug,
              user: user,
            });
          }}>
          <Ionicons name="ios-play" size={26} />
          <TextButtonPlay>Play</TextButtonPlay>
        </Play>

        <Button
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('ViewMovie', {
              slug: slug,
              user: user,
              setInList: setInList,
            });
          }}>
          <Ionicons name="information-circle-outline" size={22} color="#FFF" />
          <TextButton>Info</TextButton>
        </Button>
      </MenuHero>
    </Container>
  );
};
const data = {
  status: true,
  msg: '',
  movie: {
    modified: {
      time: '2022-07-02T15:51:05.000Z',
    },
    _id: '6290878b9e983cdfde47886a',
    name: 'Cậu bé mất tích (Phần 4)',
    origin_name: 'Stranger Things (Season 4)',
    content:
      '<p>Bóng tối trở lại Hawkins vào đúng kỳ nghỉ xuân, khơi mào nỗi kinh hoàng mới, những ký ức đáng ngại và mối đe dọa đáng sợ mới.</p>',
    type: 'series',
    status: 'completed',
    thumb_url:
      'http://img.ophim1.cc/uploads/movies/cau-be-mat-tich-phan-4-thumb.jpg',
    poster_url:
      'http://img.ophim1.cc/uploads/movies/cau-be-mat-tich-phan-4-poster.jpg',
    is_copyright: 'off',
    sub_docquyen: 'off',
    chieurap: false,
    trailer_url: '',
    time: '49phút/tập',
    episode_current: 'Hoàn Tất (9/9)',
    episode_total: '9 Tập',
    quality: 'HD',
    lang: 'Vietsub',
    notify: '',
    showtimes: '',
    slug: 'cau-be-mat-tich-phan-4',
    year: 2022,
    actor: [
      'Winona Ryder',
      ' David Harbour',
      ' Millie Bobby Brown',
      ' Finn Wolfhard',
      ' Gaten Matarazzo',
      ' Caleb McLaughlin',
      ' Noah Schnapp',
      ' Sadie Sink',
      ' Natalia Dyer',
      ' Charlie Heaton',
      ' Joe Keery',
      ' Maya Hawke',
      ' Brett Gelman',
      ' Priah Ferguson',
      ' Dacre Montgomery',
      ' Cara Buono',
      ' Matthew Modine',
      ' Paul Reiser',
      ' Sean Astin',
      ' Shannon Purser',
    ],
    director: [''],
    category: [
      {
        name: 'Viễn Tưởng',
      },
      {
        name: 'Khoa Học',
      },
      {
        name: 'Kinh Dị',
      },
    ],
    country: [
      {
        name: 'Âu Mỹ',
      },
    ],
  },
  episodes: [
    {
      server_name: 'Vietsub #1',
      server_data: [
        {
          name: '1',
          slug: '1',
          filename: 'Cậu bé mất tích_S04E01_Tập một_ Câu lạc bộ Hellfire',
          link_embed:
            'https://kd.hd-bophim.com/share/83b7e1c6a22424f5b4c47bb30798b770',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12872_b9bae9c0/index.m3u8',
        },
        {
          name: '2',
          slug: '2',
          filename: 'Cậu bé mất tích_S04E02_Tập hai_ Lời nguyền của Vecna',
          link_embed:
            'https://kd.hd-bophim.com/share/5444df470d67382653f5c5600221ddb7',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12866_ac5e62a3/index.m3u8',
        },
        {
          name: '3',
          slug: '3',
          filename: 'Cậu bé mất tích_S04E03_Tập ba_ Quái vật và siêu anh hùng',
          link_embed:
            'https://kd.hd-bophim.com/share/ae306dc92ae6dfe9049d4b2177bb932d',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12867_7bf973c4/index.m3u8',
        },
        {
          name: '4',
          slug: '4',
          filename: 'Cậu bé mất tích_S04E04_Tập bốn_ Billy thân mến',
          link_embed:
            'https://kd.hd-bophim.com/share/28542e7ec2f6c92bb1bfe25c58e0b28c',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12868_1c4b6b22/index.m3u8',
        },
        {
          name: '5',
          slug: '5',
          filename: 'Cậu bé mất tích_S04E05_Tập năm_ Dự án Nina',
          link_embed:
            'https://kd.hd-bophim.com/share/5ed17b7aeb1316a3f8daf637f4a7a6b4',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12869_d80fda55/index.m3u8',
        },
        {
          name: '6',
          slug: '6',
          filename: 'Cậu bé mất tích_S04E06_Tập sáu_ Lặn sâu',
          link_embed:
            'https://kd.hd-bophim.com/share/8c23abf230b77ce18d89e5c51ee4f509',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12870_6f102ce0/index.m3u8',
        },
        {
          name: '7',
          slug: '7',
          filename:
            'Cậu bé mất tích_S04E07_Tập bảy_ Vụ thảm sát tại phòng thí nghiệm Hawkins',
          link_embed:
            'https://kd.hd-bophim.com/share/f1b9528d5fb5c272d2f05a5b82611b3c',
          link_m3u8:
            'https://kd.hd-bophim.com/20220527/12871_afbc406e/index.m3u8',
        },
        {
          name: '8',
          slug: '8',
          filename: 'Cậu bé mất tích_S04E08_Tập tám_ Bố',
          link_embed:
            'https://kd.hd-bophim.com/share/9b77e252a999cab18512f3db1a414ddf',
          link_m3u8:
            'https://kd.hd-bophim.com/20220701/16639_1b064669/index.m3u8',
        },
        {
          name: '9',
          slug: '9',
          filename: 'Cậu bé mất tích_S04E09_Tập chín_ Thâm nhập',
          link_embed:
            'https://kd.hd-bophim.com/share/b3432faaca931632a24fc96b3d1c71ef',
          link_m3u8:
            'https://kd.hd-bophim.com/20220701/16638_5237f6a2/index.m3u8',
        },
      ],
    },
  ],
};
export default Hero;
