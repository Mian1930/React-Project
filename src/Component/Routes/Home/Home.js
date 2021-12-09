import React from 'react';
import Navbar from '../../SubComponent/Navbar';
import BannerSlider from './BannerSlider';
import LowerSection from './LowerSection';

const Home = () => {
    return (
        <>
            <div className="Background">
                <div className=" Background1">
                    <Navbar />
                    <div className="container">
                        <div className="row pb-5">
                            <div className="col-12 col-md-6 center">
                                <div className="p-4">
                                    <h2>Assets Performance Comparator</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation </p>

                                    <form className="AddedButton mt-5">
                                        <input />
                                        <button className="px-3 py-2" >Notify</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 center">
                                <BannerSlider />
                            </div>
                        </div>
                    </div>
                </div>

                <LowerSection />
            </div>
        </>
    );
}

export default Home;