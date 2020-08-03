import React from 'react';
import { useMediaQuery } from 'react-responsive';
import engine from '../../images/specifications/engine.png';
import fuel from '../../images/specifications/fuel.png';
import speed from '../../images/specifications/speed.png';
import ruler from '../../images/specifications/ruler.png';

const SpecificationSelected = ({ specificationState, hideSpecification, contentContainer }) => {
  const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1280px)' });
  return (
    <div className="specifications__specification-selected">
      <div className="specifications__specification-content-container" ref={contentContainer}>
        <div className="specifications__specification-content">
          <div className="specifications__specification-image-container">
            <img src={specificationState.specification.image} alt="luxury-car" className="specifications__specification-image" />
            <p className="specifications__specification-version">{specificationState.version}</p>
          </div>
          <div className="specifications__specification-description">
            <div className="specifications__specification-title">
              <img src={engine} alt="engine" className="specifications__specification-icon" />
              <p className="specifications__specification-title-text">Engine Technical Data</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Engine type - Numbers of cylinders :</p>
              <p className="specifications__specification-value">{specificationState.specification.engineType}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Engine code :</p>
              <p className="specifications__specification-value">{specificationState.specification.engineCode}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel type :</p>
              <p className="specifications__specification-value">{specificationState.specification.fuelType}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel system :</p>
              <p className="specifications__specification-value">{specificationState.specification.fuelSystem}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Engine Alignment :</p>
              <p className="specifications__specification-value">{specificationState.specification.engineAlignment}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Engine Position :</p>
              <p className="specifications__specification-value">{specificationState.specification.engineType}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Engine size - Displacement - Engine capacity :</p>
              <p className="specifications__specification-value">{specificationState.specification.engineSize}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Bore x Stroke :</p>
              <p className="specifications__specification-value">{specificationState.specification.boreStroke}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Number of valves :</p>
              <p className="specifications__specification-value">{specificationState.specification.numberValves}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Aspiration :</p>
              <p className="specifications__specification-value">{specificationState.specification.aspiration}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Compression Ratio :</p>
              <p className="specifications__specification-value">{specificationState.specification.compressionRatio}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Maximum power - Output - Horsepower :</p>
              <p className="specifications__specification-value">{specificationState.specification.maximumPower}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Maximum torque :</p>
              <p className="specifications__specification-value">{specificationState.specification.maximumTorque}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Drive wheels - Traction - Drivetrain :</p>
              <p className="specifications__specification-value">{specificationState.specification.driveWheels}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Transmission Gearbox - Number of speeds :</p>
              <p className="specifications__specification-value">{specificationState.specification.transmissionGearbox}</p>
            </div>
          </div>
        </div>
        <div className="specifications__specification-content">
          <div className="specifications__specification-description margin-bottom">
            <div className="specifications__specification-title">
              <img src={fuel} alt="fuel" className="specifications__specification-icon" />
              <p className="specifications__specification-title-text">Fuel Consumption (Economy), Emissions and Range</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel Consumption - Economy - Combined :</p>
              <p className="specifications__specification-value">{specificationState.specification.consumptionCombined}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel Consumption - Economy - Extra Urban :</p>
              <p className="specifications__specification-value">{specificationState.specification.consumptionUrban}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel Consumption - Economy - City :</p>
              <p className="specifications__specification-value">{specificationState.specification.consumptionCity}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Range :</p>
              <p className="specifications__specification-value">{specificationState.specification.range}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Fuel Tank Capacity :</p>
              <p className="specifications__specification-value">{specificationState.specification.fuelTank}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">CO2 emissions :</p>
              <p className="specifications__specification-value">{specificationState.specification.co2Emissions}</p>
            </div>
          </div>
          <div className="specifications__specification-description">
            <div className="specifications__specification-title">
              <img src={speed} alt="speed" className="specifications__specification-icon" />
              <p className="specifications__specification-title-text">Performance</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Top Speed :</p>
              <p className="specifications__specification-value">{specificationState.specification.topSpeed}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Acceleration 0 to 100 km/h (0 to 62 mph) :</p>
              <p className="specifications__specification-value">{specificationState.specification.acceleration}</p>
            </div>
          </div>
          {isTabletOrLaptop && <div className="specifications__specification-description" style={{ marginTop: '20px' }}>
            <div className="specifications__specification-title">
              <img src={ruler} alt="ruler" className="specifications__specification-icon" />
              <p className="specifications__specification-title-text">Size, Dimensions, Aerodynamics and Weight</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Body :</p>
              <p className="specifications__specification-value">{specificationState.specification.body}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Number of Doors :</p>
              <p className="specifications__specification-value">{specificationState.specification.numberDoors}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Wheelbase :</p>
              <p className="specifications__specification-value">{specificationState.specification.wheelBase}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Length :</p>
              <p className="specifications__specification-value">{specificationState.specification.length}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.width}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Height :</p>
              <p className="specifications__specification-value">{specificationState.specification.height}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Axle :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontAxle}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Axle :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearAxle}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Number of Seats :</p>
              <p className="specifications__specification-value">{specificationState.specification.numberSeats}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Aerodynamic drag coefficient - Cx :</p>
              <p className="specifications__specification-value">{specificationState.specification.aerodynamic}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Brakes - Disc dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontBrakes}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Brakes - Dics dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearBrakes}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Tyres - Rims dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontTyres}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Tyres - Rims dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearTyres}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Wheels Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontWheelsWidth}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Wheels Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearWheelsWidth}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Curb Weight :</p>
              <p className="specifications__specification-value">{specificationState.specification.curbWeight}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Power To Weight Ratio :</p>
              <p className="specifications__specification-value">{specificationState.specification.powerRatio}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Trunk/Boot capacity :</p>
              <p className="specifications__specification-value">{specificationState.specification.trunk}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Steering :</p>
              <p className="specifications__specification-value">{specificationState.specification.steering}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Suspension :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontSuspension}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Suspension :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearSuspension}</p>
            </div>
          </div>}
        </div>
        {!isTabletOrLaptop && <div className="specifications__specification-content">
          <div className="specifications__specification-description">
            <div className="specifications__specification-title">
              <img src={ruler} alt="ruler" className="specifications__specification-icon" />
              <p className="specifications__specification-title-text">Size, Dimensions, Aerodynamics and Weight</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Body :</p>
              <p className="specifications__specification-value">{specificationState.specification.body}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Number of Doors :</p>
              <p className="specifications__specification-value">{specificationState.specification.numberDoors}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Wheelbase :</p>
              <p className="specifications__specification-value">{specificationState.specification.wheelBase}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Length :</p>
              <p className="specifications__specification-value">{specificationState.specification.length}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.width}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Height :</p>
              <p className="specifications__specification-value">{specificationState.specification.height}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Axle :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontAxle}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Axle :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearAxle}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Number of Seats :</p>
              <p className="specifications__specification-value">{specificationState.specification.numberSeats}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Aerodynamic drag coefficient - Cx :</p>
              <p className="specifications__specification-value">{specificationState.specification.aerodynamic}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Brakes - Disc dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontBrakes}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Brakes - Dics dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearBrakes}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Tyres - Rims dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontTyres}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Tyres - Rims dimensions :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearTyres}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Wheels Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontWheelsWidth}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Wheels Width :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearWheelsWidth}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Curb Weight :</p>
              <p className="specifications__specification-value">{specificationState.specification.curbWeight}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Power To Weight Ratio :</p>
              <p className="specifications__specification-value">{specificationState.specification.powerRatio}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Trunk/Boot capacity :</p>
              <p className="specifications__specification-value">{specificationState.specification.trunk}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Steering :</p>
              <p className="specifications__specification-value">{specificationState.specification.steering}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Front Suspension :</p>
              <p className="specifications__specification-value">{specificationState.specification.frontSuspension}</p>
            </div>
            <div className="specifications__specification-inner-description">
              <p className="specifications__specification-property">Rear Suspension :</p>
              <p className="specifications__specification-value">{specificationState.specification.rearSuspension}</p>
            </div>
          </div>
        </div>}
      </div>
      <div className="specifications__close-specification" onClick={hideSpecification}>X</div>
    </div>
  );
}

export default SpecificationSelected;
