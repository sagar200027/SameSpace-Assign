import React, { useEffect, useState } from "react";
import "./songs.css";
import { gql, useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { currentIndex, song, songLength } from "../redux/Reducers";

const GET_SONGS_LIST = gql`
  query getSongsQuery($id: Int!) {
    getSongs(playlistId: $id) {
      artist
      duration
      photo
      title
      url
      _id
    }
  }
`;

const Songs = () => {
  const { selectedSong, selectedTab, currentSongIndex } = useSelector(
    (state) => state
  );
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const [callSongsApi, { loading, data }] = useLazyQuery(GET_SONGS_LIST, {
    variables: {
      id: 1,
    },
  });
  const handleCallApi = () => {
    callSongsApi({
      variables: {
        id: selectedTab,
      },
    }).then((res) => {
      setFilteredData(res?.data?.getSongs);
    });
  };

  useEffect(() => {
    handleCallApi();
    //eslint-disable-next-line
  }, [selectedTab]);

  useEffect(() => {
    handleDiscptachNewSong();
    // eslint-disable-next-line
  }, [currentSongIndex]);

  const handleDiscptachNewSong = () => {
    dispatch(song(data?.getSongs?.[currentSongIndex]));
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = data?.getSongs?.filter((item) =>
      item?.title?.toLowerCase().includes(searchValue)
    );
    // console.log('rgetdfvgdfv',searchValue,filtered);
    setFilteredData(filtered);
  };

  const handleSongSelect = (item, index) => {
    dispatch(song(item));
    dispatch(songLength(data?.getSongs?.length));
    dispatch(currentIndex(index));
  };

  const formattedTime = (d) => {
    const f = `${Math.floor(d / 60)}:${d % 60}`;
    return f;
  };

  const handleTabText = () => {
    switch (selectedTab) {
      case 1: {
        return "For You";
      }
      case 2: {
        return "Top Tracks";
      }
      case 3: {
        return "Favourites";
      }
      case 4: {
        return "Recently Played";
      }
      default: {
        return "";
      }
    }
  };

  if (loading) {
    return (
      <div id="songs-main-div">
        <div id="for-you-text-container">
          <h1 id="for-you-text">{handleTabText()}</h1>
        </div>
        <div className="loader">
          <h4 className="loading-text">Loading...</h4>
        </div>
      </div>
    );
  }

  return (
    <div id="songs-main-div">
      <div id="for-you-text-container">
        <h1 id="for-you-text">{handleTabText()}</h1>
      </div>
      <div id="search-songs-container">
        <input
          id="search-songs-input"
          onChange={handleSearch}
          placeholder="Search Song, Artist"
        />
        <div id="search-icon-container">
          <img
            style={{ marginRight: "10px", marginTop: "3px" }}
            alt="Search Icon"
            src={require("../images/SearchIcon.png")}
          />
        </div>
      </div>

      <div className="list">
        {filteredData?.map((item, index) => {
          // console.log('index',item,index);
          return (
            <div
              onClick={() => handleSongSelect(item, index)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor:
                  selectedSong?.title === item?.title
                    ? "rgba(256,256,256,0.2)"
                    : "transparent",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{ borderRadius: 50, width: "60px", height: "60px" }}
                  src={item?.photo}
                  alt="song cover"
                />
                <div
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 0,
                    // backgroundColor:'red'
                  }}
                >
                  <p>{item?.title}</p>
                  <p style={{ opacity: "0.4" }}>{item?.artist}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: 18, opacity: "0.4" }}>
                  {formattedTime(item?.duration)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Songs;
