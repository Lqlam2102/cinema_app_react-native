/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {View, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  margin-top: 10px;
  margin-left: 25px;
  font-family: 'Montserrat_600SemiBold';
  font-weight: 600;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 29.5) / 100)}px;
  height: 200px;
`;

const MovieCard = styled.View`
  padding-right: 9px;
`;

const ResultsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
`;

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  const [results2, setResults2] = useState(null);
  useEffect(() => {

  },[]);

  return (
      <>
        <StatusBar style="light"/>
        <Container>
          <Header login={true} goBack={navigation.goBack} />
          <SearchBoxWrapper>
            <SearchBox>
              <MaterialIcons
                name="search"
                size={30}
                color="#B1B1B1"
                style={{margin: 10}}
              />
              <SearchInput
                value={search}
                onChangeText={text => setSearch(text)}
                placeholderTextColor="#7f7f7f"
                placeholder="Tìm kiếm phim lẻ, phim tập, show, ..."
              />
              <TouchableOpacity activeOpacity={0.5}>
                <MaterialCommunityIcons
                  name="microphone"
                  size={30}
                  color="#b1b1b1"
                  style={{margin: 10}}
                />
              </TouchableOpacity>
            </SearchBox>
          </SearchBoxWrapper>
          {results2 && (
            <>
              <TopResultsText>Top Searches</TopResultsText>
              <ResultsWrapper>
                {results2.map((movie, item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={item}
                      onPress={() => {
                        navigation.navigate('ViewMovie', {
                          id: movie.id,
                        });
                      }}>
                      <MovieCard>
                        <MoviePoster
                          resizeMode="cover"
                          source={{uri: movie.banner}}
                        />
                      </MovieCard>
                    </TouchableOpacity>
                  );
                })}
              </ResultsWrapper>
            </>
          )}
        </Container>
      </>
    )
};

export default Search;
