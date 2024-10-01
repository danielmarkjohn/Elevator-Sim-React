import React, {useState, useEffect} from 'react'
import './Elevator.css' // For modern styling

const Elevator = () => {
  const [currentFloor, setCurrentFloor] = useState(0)
  const [targetFloor, setTargetFloor] = useState<number | null>(null)
  const [isMoving, setIsMoving] = useState(false)

  const totalFloors = 5

  const moveToFloor = (floor: number) => {
    if (floor !== currentFloor) {
      setTargetFloor(floor)
      setIsMoving(true)
    }
  }

  const stopLift = () => {
    setIsMoving(false)
    setTargetFloor(null)
  }

  useEffect(() => {
    if (isMoving && targetFloor !== null) {
      const movementInterval = setInterval(() => {
        if (currentFloor < targetFloor) {
          setCurrentFloor((prev) => prev + 1)
        } else if (currentFloor > targetFloor) {
          setCurrentFloor((prev) => prev - 1)
        }

        if (currentFloor === targetFloor) {
          stopLift()
        }
      }, 1000)

      return () => clearInterval(movementInterval)
    }
  }, [isMoving, targetFloor, currentFloor])

  return (
    <div className="elevator-container">
      <div className="floor-section">
        {[...Array(totalFloors)].map((_, floor) => (
          <div
            key={floor}
            className={`floor-plan ${
              currentFloor === floor ? 'current-floor' : ''
            }`}
          >
            <div className="floor-number">Floor {floor + 1}</div>
            <div className="floor-buttons">
              {floor > 0 && (
                <button
                  className="floor-button"
                  onClick={() => moveToFloor(floor - 1)}
                >
                  Down
                </button>
              )}
              {floor < totalFloors - 1 && (
                <button
                  className="floor-button"
                  onClick={() => moveToFloor(floor + 1)}
                >
                  Up
                </button>
              )}
            </div>
            <div className="floor-layout">
              <div className="wall"></div>
              <div className="door"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="elevator">
        <div className="lift-display">
          Elevator is at: Floor {currentFloor + 1}
        </div>
        <div className="lift-panel">
          {[...Array(totalFloors)].map((_, floor) => (
            <button
              key={floor}
              className={`lift-button ${
                floor === targetFloor ? 'lift-button-active' : null
              }`}
              onClick={() => moveToFloor(floor)}
            >
              {floor + 1}
            </button>
          ))}
          <button className="stop-button" onClick={stopLift}>
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}

export default Elevator
