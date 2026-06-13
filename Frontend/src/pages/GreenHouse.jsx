import { assets } from "../assets/assets";

const GreenHouse = () => {
    return (
      <div className="bg-white text-gray-800 px-6 py-10 max-w-6xl mx-auto">
  
        <h1 className="text-4xl font-bold text-center mb-8">
          Greenhouse Implementation and Temperature Control
        </h1>
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            What is a Greenhouse?
          </h2>
  
          <p className="text-lg leading-8">
            A greenhouse is a controlled agricultural structure that allows crops
            to grow under optimized environmental conditions. It uses transparent
            materials such as glass or polycarbonate sheets to trap solar energy,
            creating a warmer environment compared to the outside atmosphere.
            This helps farmers cultivate crops even when external weather
            conditions are unsuitable.
          </p>
  
          <img
            src={assets.green1}
            alt="Greenhouse structure"
            className="w-full h-72 object-cover rounded-lg my-6"
          />
        </section>
  
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Implementation of Greenhouse System
          </h2>
  
          <p className="text-lg leading-8 mb-4">
            A greenhouse system can be implemented by combining structural
            components, environmental sensors, and automated control mechanisms.
            The main components include:
          </p>
  
          <ul className="list-disc ml-8 space-y-3 text-lg">
            <li>
              <b>Greenhouse Structure:</b> A transparent enclosure made from
              glass, polycarbonate, or polyethylene sheets that allows sunlight
              to enter while reducing heat loss.
            </li>
  
            <li>
              <b>Temperature Sensors:</b> Sensors continuously monitor internal
              temperature and provide real-time data for controlling the system.
            </li>
  
            <li>
              <b>Ventilation System:</b> Exhaust fans and adjustable vents remove
              excess heat when the temperature rises above the required level.
            </li>
  
            <li>
              <b>Heating System:</b> During colder conditions, heaters maintain
              suitable temperatures required for crop growth.
            </li>
  
            <li>
              <b>Automatic Control Unit:</b> A microcontroller or IoT-based
              controller processes sensor data and operates fans, heaters, and
              irrigation systems automatically.
            </li>
          </ul>
  
          <img
            src={assets.green2}
            alt="Greenhouse implementation"
            className="w-full h-72 object-cover rounded-lg my-6"
          />
        </section>
  
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Temperature Control in Greenhouse
          </h2>
  
          <p className="text-lg leading-8">
            Maintaining the correct temperature is essential for healthy crop
            development. Each crop has an optimum temperature range where growth,
            flowering, and yield are maximized.
          </p>
  
          <img
            src={assets.green3}
            alt="Temperature monitoring system"
            className="w-full h-72 object-cover rounded-lg my-6"
          />
  
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Temperature Increasing Mechanism
          </h3>
  
          <p className="text-lg leading-8">
            During cold conditions, greenhouse temperature can be increased by
            reducing heat loss, using artificial heaters, and storing solar heat
            during daytime. Thermal screens and insulation materials help retain
            heat inside the greenhouse.
          </p>
  
  
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Temperature Reduction Mechanism
          </h3>
  
          <p className="text-lg leading-8">
            When the internal temperature becomes too high, ventilation fans,
            roof vents, evaporative cooling systems, and shading nets are used to
            remove excess heat. Automated controllers can activate cooling
            systems whenever temperature exceeds the defined limit.
          </p>
  
          <img
            src={assets.green4}
            alt="Greenhouse cooling system"
            className="w-full h-72 object-cover rounded-lg my-6"
          />
  
        </section>
  
  
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Benefits of Greenhouse Temperature Management
          </h2>
  
          <ul className="list-disc ml-8 space-y-3 text-lg">
            <li>Provides stable growing conditions throughout the year.</li>
            <li>Protects crops from extreme weather conditions.</li>
            <li>Improves crop quality and production efficiency.</li>
            <li>Reduces water consumption through controlled irrigation.</li>
            <li>Supports cultivation of crops outside their natural climate.</li>
          </ul>
        </section>
  
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Integration with Smart Agriculture
          </h2>
  
          <p className="text-lg leading-8">
            Modern greenhouses can be integrated with IoT sensors, machine
            learning models, and automated control systems. Data collected from
            sensors such as temperature, humidity, soil moisture, and light
            intensity can be analyzed to provide precise recommendations and
            maintain ideal crop conditions.
          </p>
  
          <img
            src={assets.green5}
            alt="Smart agriculture greenhouse"
            className="w-full h-72 object-cover rounded-lg my-6"
          />
        </section>
  
      </div>
    );
  };
  
  export default GreenHouse;