const destinationModel=require("../Models/DestinationModel");

 const getdestinations=async (req, res) => {
    try {
      const destinations = await destinationModel.find();
      res.json(destinations);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  

  module.exports={getdestinations};