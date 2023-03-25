import "../components/styles/landing.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const handleDetail = (id) => {
    navigate("/note/" + id);
  };

  useEffect(() => {
    const getnote = async () => {
      await fetch("http://localhost:3000/task", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setData(data.data);
        })
        .catch((e) => console.log(e));
    };
    if (search == "") {
      getnote();
    } else {
      handleSearch();
    }
  }, []);
  
  const handleSearch = () => {
    const searchedNote = data.filter((result) =>
      result.title.toLowerCase().includes(search.toLowerCase())
    );
    setData(searchedNote);
  };

  return (
    <div className="landing flex-col">
      <div className="search flex-row">
        <input type="text" placeholder="search" id="search" />
        <button className="ser-btn">
          <SearchIcon />
        </button>
      </div>
      
        {data &&
          data.map((result) => {
            return (
                <div className="tasks flex-col">
                    <div>
                        <h4>{result.title}</h4>
                        <p>{result.description}</p>
                    </div>
                    <div>
                    <button className="edit" onClick={()=>navigate(`/edit/${result._id}`)}>Edit</button>
                    </div>
              </div>
            );
          })}
      </div>
    
  );
};
export default Landing;
