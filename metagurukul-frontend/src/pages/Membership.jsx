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
                <h2 className="chooseplan-title">Choose a plan</h2>
                <div className="membership-cards">
                     
                    <div className="plan-card basic">
                        <h3>Free</h3>
                        <p className="price">₹0/month</p>
                        <ul>
                            <li>Access to trial courses</li>
                            <li>Limited webinar invites</li>
                            <li>Community support</li>
                        </ul>
                        <button>Get Started</button>
                    </div>

                    <div className="plan-card premium">
                        <h3>Premium</h3>
                        <p className="price">₹299/month</p>
                        <ul>
                            <li>Unlimited course access</li>
                            <li>All live webinars</li>
                            <li>Recorded sessions access</li>
                            <li>Email support</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>

                    <div className="plan-card ultimate">
                        <h3>Ultimate</h3>
                        <p className="price">₹2499/year</p>
                        <ul>
                            <li>Everything in Premium</li>
                            <li>1-on-1 mentor session</li>
                            <li>Early access to new content</li>
                        </ul>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>    
        </Layout>
    )
};

export default Membership;