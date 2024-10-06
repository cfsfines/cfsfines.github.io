import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Spotify from './components/Spotify';
import SearchPlaylist from './components/SearchPlaylist';
import PlaySongs from './components/PlaySongs';
import withLocalStorageCheck from './components/withLocalStorageCheck';
import { BackgroundColor } from './components/SharedStyles';

const SearchPlaylistWithLocalStorageCheck = withLocalStorageCheck(SearchPlaylist);

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/spotify') && <BackgroundColor />}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spotify" element={<Spotify />}>
            <Route path="playlist" element={<SearchPlaylistWithLocalStorageCheck />} />
            <Route path="play" element={<PlaySongs />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
