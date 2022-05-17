import Header from './header'
import { Link, useNavigate, useParams,useSearchParams   } from "react-router-dom";

function Dashboard() {
    let params = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const  update_data = searchParams.get("update");
    return (
        <div className ="dashboard_main_container">
            <Header />
            <div className="dashboard_main_container_inner">
                <h1>Welcome to Dashboard</h1>
                <span className='alert_success'> {update_data} </span>
            </div> 
        </div>
    );
  }
  
  export default Dashboard;