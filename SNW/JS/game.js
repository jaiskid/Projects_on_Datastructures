let prizes_config = {
count: 12,
prize_name :["3000 credits","35% off","Hard Luck","70% off","Swagpack","100% off","Netflix","50% off","Amazon Voucher","2 Extra Spin","CB Tshirt","CB BOOK"]
}
let config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor:0xffcc0,
  scene : {
    preload : preload,
    create : create,
    update : update,

  }
};
let game =new Phaser.Game(config);
function preload(){
    console.log("Preload");
    
    //load object ,load some images
    this.load.image('background','./Images/back.jpg');
    this.load.image('Wheel','./Images/wheel.png');
    this.load.image('pin','./Images/pin.png');
    this.load.image('stand','./Images/stand.png');
    console.log(this);

}
function create(){
    console.log("Create");
    let W = game.config.width;
    let H = game.config.height;
    //This belong to the background
    let background=this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    //This belong to the stand
    let stand= this.add.sprite(0,0,'stand');
    stand.setPosition(W/2,H/2+250);
    stand.setScale(0.18);
    //This belong to the wheel
    this.Wheel=this.add.sprite(W/2,H/2,'Wheel');
    this.Wheel.setScale(0.25);
    //this.Wheel.alpha=0.5;
    //This belong to the pin 
    let pin=this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    //Event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);
    //lets create text object
    font_style = { 
        font: "bold 30px roboto",
        align :'center',
        color :"red",
    }
    this.game_text=this.add.text(10,10,"Welcome to spin & win",font_style);
    
}
//Game loop
function update(){
    console.log("Update");
    //this.Wheel.angle +=1;
    // this.Wheel.scaleX+=0.01;
    // this.Wheel.scaleY+=0.01;
    // this.Wheel.alpha -=1;
}
function spinwheel(){
    console.log("You clicked the mouse");
    console.log("start spinning");
    // this.game_text.setText("You clicked the mouse! ");
    let rounds =Phaser.Math.Between(2,4);
    console.log(rounds);
    let degrees=Phaser.Math.Between(0,11)*30;
    let total_angle=rounds*360 + degrees;
    console.log(total_angle);
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    tween =this.tweens.add({
        targets: this.Wheel,
        angle :total_angle, //randomly 
        ease : "cubic.easeOut", //animation 
        duration : 6000,
        callbackScope:this,
        onComplete :function(){
            this.game_text.setText("You won 😎\n" + prizes_config.prize_name[idx]);
            
        }
    });
}