particles=[]
piles=[]
setup=()=>{
  createCanvas(800, 800)
  strokeWeight(4)
  for(i=400;i--;){
    particles.push({
      x:random(width),
      y:random(height),
      vx:0,
      vy:0,
      colour:0
    })
  }
	
	for(i=10;i--;){
		piles.push({x:random(width),y:random(height)})
	}
}

mouseClicked=()=>{
piles.push({x:mouseX,y:mouseY})  
}

draw=()=> {
  background(0)
  
  rectMode(CENTER)
  stroke('white')

  for(a of piles){
    circle(a.x,a.y,30)
  }
  
  for(a of particles){
    for(b of piles){
      d=(b.x-a.x)**2+(b.y-a.y)**2
      if(d<2000){
        a.vx+=(a.x-b.x)/d*12
        a.vy+=(a.y-b.y)/d*12
      }
    }
    
    dif_x=dif_y=0
    count=0
    dif_vx=dif_vy=0
    for(b of particles){
      d=sqrt((a.x-b.x)**2+(a.y-b.y)**2)
      if(d&&d<100){
        if(d<30){
          a.vx-=(b.x-a.x)/d/d
          a.vy-=(b.y-a.y)/d/d
        }
        dif_vx+=b.vx
        dif_vy+=b.vy
        dif_x+=b.x
        dif_y+=b.y
        count++
      }
    }
    if(count){
      d=atan2(dif_vy,dif_vx)
      a.vx+=cos(d)/10
      a.vy+=sin(d)/10
      a.vx+=(dif_x/count-a.x)/200
      a.vy+=(dif_y/count-a.y)/200
      a.colour=count*2
    }
  }
  
// Update & Show
  colorMode(HSB,360)
  for(_ of particles)with(_){
    if(vx**2+vy**2>9){
      r=atan2(vy,vx)
      vx=cos(r)*3
      vy=sin(r)*3
    }
    stroke(colour,360,360)
    line(x,y,x+=vx,y+=vy)
    x=(x+width)%width
    y=(y+height)%height
  }
}