import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Feed, ChannelDetails, VideoDetails, SearchFeed } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "common.black" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
