import React from 'react';
import $ from 'jquery'
import Banner1 from "../../../Images/banner1.jpg"
import Banner2 from "../../../Images/banner2.jpg"
import Banner3 from "../../../Images/banner3.jpg"
import Banner4 from "../../../Images/banner4.jpg"
import Banner5 from "../../../Images/banner5.jpg"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


class BannerSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "gallery",
      dots: false,
      arrows: true,
      infinite: true,
      fade: true,
      adaptiveHeight: true,
      imagesNodes: "",
      arrIndexes: []
    }
  }
  componentDidMount = () => {
    let sliderImagesBox = document.querySelectorAll('.cards-box');
    let countt = 2
    sliderImagesBox.forEach(el => {
      let imageNodes = el.querySelectorAll('.card:not(.hide)')

      let arrIndexes = []; // Index array
      (() => {
        // The loop that added values to the arrIndexes array for the first time
        let start = 0;
        while (imageNodes.length > start) {
          arrIndexes.push(start++);
        }
      })();


      this.set(imageNodes, arrIndexes)


      let setIndex = (arr) => {
        for (let i = 0; i < imageNodes.length; i++) {
          imageNodes[i].dataset.slide = arr[i] // Set indexes
        }
      }
      el.addEventListener('click', () => {
        this.next()
        // this.next(arrIndexes, imageNodes)
      })
      setIndex(arrIndexes) // The first indexes addition
    });

  }

  set = (a, b) => {
    this.setState({
      imagesNodes: a,
      arrIndexes: b

    });
  }

  next = () => {
    this.state.arrIndexes.unshift(this.state.arrIndexes.pop());

    for (let i = 0; i < this.state.imagesNodes.length; i++) {
      this.state.imagesNodes[i].dataset.slide = this.state.arrIndexes[i] // Set indexes
    }
    $('#nav-next').addClass('active')
    $('#nav-back').removeClass('active')
  }

  back = () => {
    this.state.arrIndexes.push(this.state.arrIndexes.shift());

    for (let i = 0; i < this.state.imagesNodes.length; i++) {
      this.state.imagesNodes[i].dataset.slide = this.state.arrIndexes[i] // Set indexes
    }
    $('#nav-back').addClass('active')
    $('#nav-next').removeClass('active')
  }


  render() {
    return (
      <>
        <div>
          <div className="cards-box banner-slider-container">
            <div className="card hide">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner1} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner1} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner2} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner3} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner4} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="content-placeholder">
                <img width="100%" draggable="false" src={Banner5} alt="" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button className="btn rounded-pill BannerNav" id="nav-back" onClick={this.back} ><ArrowBackIcon /> </button>
            <button className="btn rounded-pill BannerNav" id='nav-next' onClick={this.next} ><ArrowForwardIcon /></button>
          </div>
        </div>
      </>
    );
  }
}

export default BannerSlider;

// const BannerSlider = () => {
//   const settings = {
//     className: "gallery",
//     dots: false,
//     arrows: true,
//     infinite: true,
//     fade: true,
//     adaptiveHeight: true,
//     imagesNode: ""
//   };

//   const [FormData, setFormData] = useState(settings);
//   const { imagesNode, count } = FormData;
//   window.onload = () => {
//     let sliderImagesBox = document.querySelectorAll('.cards-box');
//     sliderImagesBox.forEach(el => {
//       let imageNodes = el.querySelectorAll('.card:not(.hide)')

//       let arrIndexes = []; // Index array
//       (() => {
//         // The loop that added values to the arrIndexes array for the first time
//         let start = 0;
//         while (imageNodes.length > start) {
//           arrIndexes.push(start++);
//         }
//       })();

//       set(imageNodes, arrIndexes)


//       let setIndex = (arr) => {
//         for (let i = 0; i < imageNodes.length; i++) {
//           imageNodes[i].dataset.slide = arr[i] // Set indexes
//         }
//       }
//       el.addEventListener('click', () => {
//         arrIndexes.unshift(arrIndexes.pop());
//         setIndex(arrIndexes)
//         next(arrIndexes, imageNodes)
//       })
//       setIndex(arrIndexes) // The first indexes addition
//     });
//   };

//   const set = (a, b) => {
//     setFormData({
//       ...FormData,
//       imagesNode: a,
//       arrIndexe: b,
//       count: 1

//     });
//     console.log(FormData)
//   }

//   const next = (a, b) => {
//     console.log(a, b)
//     console.log(FormData)
//   }

//   return (
//     <div>
//       <div className="cards-box banner-slider-container">
//         <div className="card hide">
//           <div className="content-placeholder">
//             <img width="100%" draggable="false" src={Banner1} alt="" />
//           </div>
//         </div>
//         <div className="card">
//           <div className="content-placeholder">
//             <img width="100%" draggable="false" src={Banner2} alt="" />
//           </div>
//         </div>
//         <div className="card">
//           <div className="content-placeholder">
//             <img width="100%" draggable="false" src={Banner3} alt="" />
//           </div>
//         </div>
//         <div className="card">
//           <div className="content-placeholder">
//             <img width="100%" draggable="false" src={Banner4} alt="" />
//           </div>
//         </div>
//       </div>
//       <button className="btn mt-5" onClick={next} >Next</button>
//     </div>
//   );
// };



// export default BannerSlider