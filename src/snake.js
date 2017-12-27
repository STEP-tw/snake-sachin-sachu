const Snake=function(head,body) {
  this.head=head;
  this.body=body;
}

Snake.prototype={
  getBody:function() {
    return this.body;
  },
  getHead:function() {
    return this.head;
  },
  move:function() {
    this.body.push(this.head);
    this.head=this.head.next();
    return this.body.shift();
  },
  grow:function() {
    this.body.unshift(new Position(Infinity,Infinity,this.direction));
  },
  turnLeft:function() {
    this.head=this.head.turnLeft();
  },
  turnRight:function() {
    this.head=this.head.turnRight();
  },
  hasHit:function(border){
    let headPos=this.head.getCoord();
    let hasHitTop=hasHitTopBorder(headPos,0);
    let hasHitBottom=hasHitBottomBorder(headPos,border[0]);
    let hasHitLeft=hasHitLeftBorder(headPos,0);
    let hasHitRight=hasHitRightBorder(headPos,border[1]);
    let hasHit=hasHitTop || hasHitBottom;
    hasHit= hasHit || hasHitLeft || hasHitRight;
    return hasHit;
  }
}

const hasHitTopBorder=function(headPos,topBorder=0){
  return headPos[1]<=topBorder;
};

const hasHitBottomBorder=function(headPos,bottomBorder){
  return headPos[1]>=bottomBorder;
};

const hasHitLeftBorder=function(headPos,leftBorder){
  return headPos[0]<=leftBorder;
};

const hasHitRightBorder=function(headPos,rightBorder){
  return headPos[0]>=rightBorder;
};
