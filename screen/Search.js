/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useDebounce from '../hooks/useDebounce';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const SearchBox = styled.View`
  width: 100%;
  height: 50px;
  background-color: #333333;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 7px;
  margin: 20px;
  margin-left: 5px;
`;

const SearchInput = styled.TextInput`
  color: #fff;
  font-size: 16px;
  margin: 5px;
  width: 80%;
`;

const SearchBoxWrapper = styled.View`
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

const TopResultsText = styled.Text`
  color: white;
  font-size: 28px;
  margin: 20px;
  margin-top: 5px;
  margin-left: 25px;
  font-family: 'Montserrat_600SemiBold';
  font-weight: 600;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 27.5) / 100)}px;
  height: 200px;
  background-color: 'white';
`;

const MovieCard = styled.View`
  padding: 5px;
`;

const ResultsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Search = ({route}) => {
  const user = route.params?.user;
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(searchValue, 600);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResults();
      return;
    }
    const fetchApi = async () => {
      fetch(
        `https://ophim1.cc/_next/data/4Ty7510PdBWqP8sPF1ThI/tim-kiem.json?keyword=${debouncedValue}`,
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .then(json => {
          setSearchResults(json?.pageProps?.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log(error.message);
        });
      // setSearchResults(result.json);
    };
    fetchApi();
    setLoading(false);
  }, [debouncedValue]);

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header user={user} goBack={navigation.goBack} />
        <SearchBoxWrapper>
          <SearchBox>
            <MaterialIcons
              name="search"
              size={30}
              color="#B1B1B1"
              style={{position: 'absolute', left: 5}}
            />
            <SearchInput
              value={searchValue}
              onChangeText={text => {
                if (!text.startsWith(' ')) {
                  setSearchValue(text);
                  setLoading(true);
                }
                if (text === ''){
                  setLoading(false);
                  setSearchResults();
                }
              }}
              placeholderTextColor="#7f7f7f"
              placeholder="Tìm kiếm phim lẻ, phim tập, show, ..."
            />
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{position: 'absolute', right: 15}}
              />
            ) : undefined}
          </SearchBox>
        </SearchBoxWrapper>
        {searchResults && (searchResults?.items?.length > 0 ? (
          <>
            <TopResultsText>Tìm kiếm hàng đầu</TopResultsText>
            <ResultsWrapper>
              {searchResults?.items.map((movie, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    onPress={() => {
                      navigation.navigate('ViewMovie', {
                        slug: movie.slug,
                        user: user,
                      });
                    }}>
                    <MovieCard>
                      <MoviePoster
                        resizeMode="cover"
                        source={{
                          uri: `https://img.ophim1.cc/uploads/movies/${movie?.thumb_url}`,
                        }}
                      />
                    </MovieCard>
                  </TouchableOpacity>
                );
              })}
            </ResultsWrapper>
          </>
        ) : (
          <>
            <TopResultsText>Không tìm thấy kết quả nào.</TopResultsText>
          </>
        ))}
      </Container>
    </>
  );
};

export default Search;
