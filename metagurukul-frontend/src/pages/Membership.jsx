import React from "react";
import Layout from "../layouts/layout";
import '../styles/pages/membership.css'
const Membership = () => {
    return (
        <Layout>
            <div className="membership-page">
                <div className="membership-img">
                    <img  src="/membership-pg-img"></img>
                </div>
                <h2 className="membership-title">MetaGurukul Membership</h2>
                <div className="membership-description">
                    <p>🎓 Become Intellectual & excel in life</p>
                    <p>🚀 Easy way to acqiure knowledge</p>
                    <p>💡 Books to read an why</p>
                </div>
                <h2 className="chooseplan-title">Yearly plan</h2>
                <div className="membership-cards">
                      
                    <div className="plan-card premium">
                        <h3>Premium</h3>
                        <p className="price">₹1199/year</p>
                        <ul>
                            <li>Unlimited course access</li>
                            <li>All live webinars</li>
                            <li>Recorded sessions access</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>

                     
                </div>
            </div>    
        </Layout>
    )
};

export default Membership;