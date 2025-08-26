Page({

    /**
     * 页面的初始数据
     */
    data: {
        region:['安徽省','芜湖市','镜湖区'],
        now:{
            temp:0,
            text:"未知",
            icon:999,
            humidity:0,
            pressure:0,
            vis:0,
            windDir:0,
            windScale:0,
            windSpeed:0
        }
    },
    regionChange:function(e){
        this.setData({region: e.detail.value});
        this.getWeather();
    },
    getWeather:function(){
      var that=this;
      wx.request({
          url: 'https://kh52qbdp86.re.qweatherapi.com/geo/v2/city/lookup',
          data: {
              location: that.data.region[2] || '北京', 
              adm: that.data.region[1], 
              range: 'cn', 
              number: 1 
          },
          header: {
            'X-QW-Api-Key': '79086a88046d4b0e9658aabafb678446'
          },
          success: function(res) {
              if (res.data.code === '200' && res.data.location.length > 0) {
                  var locationId = res.data.location[0].id;
                  wx.request({
                      url: 'https://kh52qbdp86.re.qweatherapi.com/v7/weather/now',
                      data: {
                          location: locationId
                      },
                      header: {
                        'X-QW-Api-Key': '79086a88046d4b0e9658aabafb678446'
                      },
                      success: function(res){
                          console.log(res.data);
                          that.setData({now:res.data.now});
                      },
                  });
              }
          },
      });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getWeather();
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      
    }
  })