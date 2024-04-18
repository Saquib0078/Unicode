const HotelModel=require('../Models/HotelModel')


const getHotels = async (req, res) => {
    const { from, to } = req.query;
  
    try {
        let hotels = [];

        // Define the query condition for finding all hotels
        const query = {};

        // If both from and to are provided, modify the query condition to include both cities
        if (from && to) {
            // Query hotels from both cities, making the comparison case-insensitive
            query.city = { $in: [new RegExp(from, 'i'), new RegExp(to, 'i')] };
        } else if (from) {
            // Query hotels from the specified city, making the comparison case-insensitive
            query.city = { $regex: new RegExp(from, 'i') };
        } else if (to) {
            // Query hotels from the specified city, making the comparison case-insensitive
            query.city = { $regex: new RegExp(to, 'i') };
        }

        // Find hotels based on the query condition
        hotels = await HotelModel.find(query);

        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  getHotels,
};

  