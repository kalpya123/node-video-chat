

const socket = io('/');
const videogrid=  document.getElementById('video-grid');//getting from video ejs
const myvideo = document.createElement('video');//created my elements
myvideo.muted = true; //muted myself 

const peer = new Peer(undefined,{
  path:'/peerjs',
  host:'/',
  port:'3000'
})

let myvideoStream = 
navigator.mediaDevices.getUserMedia({ //geting usermedia
    video:true,
    audio:true
}).then(stream =>{//after this i called 
  myvideoStream=stream;

  addvideoStream(myvideo,stream) ;//called in function

  peer.on('call',call=>{//use peer doc answer
    call.answer(stream)
    const video= document.createElement('video')
    call.on('stream', userVideoStream =>{
      addvideoStream(video,userVideoStream);
    })
  })
  
  socket.on('user-connected', (userId) =>{//called on sever js
    console.log('user-connected');
    setTimeout(() =>{//most important

      connectToNewUser(userId,stream);//added  in function
    },5000)
    
  })

});
peer.on('open',id =>{//id genreated by peer
  socket.emit('join-room', ROOM_ID,id);//called in server js
})





const connectToNewUser = (userId,stream) =>{
const call = peer.call(userId,stream); //call
const video = document.createElement('video');
call.on('stream' , userVideoStream =>{
  addvideoStream(video,userVideoStream);
})
  // console.log('new user added');
} 

const addvideoStream = (video,stream) =>{  //getting from function
   video.srcObject = stream;
   console.log("from addVideoStream " +stream);
   video.addEventListener('loadedmetadata',() =>{
       video.play();
   })
  videogrid.append(video);// video put in videogrid variable using append 
}


const scrollToBottom =() =>{
  let  d=$('.main_chat_window');
  d.scrollTop(d.prop("scrollHeight"));
}

const muteUnmute=() =>{  
  const enabled = myvideoStream.getAudioTracks()[0].enabled;
  if(enabled)
  {
   myvideoStream.getAudioTracks()[0].enabled=false;
    setUnmuteButton();
  }
  else{
    setMuteButton();
    myvideoStream.getAudioTracks()[0].enabled= true;
  }
}



 const setMuteButton =() =>{
   const html = ` <i class="fas fa-microphone"></i>
   <span>Mute</span>
   `
   document.querySelector('.main_mute_button').innerHTML= html;
 }


 const setUnmuteButton=() =>{
  const html = ` <i class="unmute fas fa-microphone-slash"></i>
  <span>UnMute</span>
  `
  document.querySelector('.main_mute_button').innerHTML= html;
 }



 const playstop=() =>
 {
  
   let enabled= myvideoStream.getVideoTracks()[0].enabled;
  
    enabled=false;
     setStopVideo();
     myvideoStream.getVideoTracks()[0].enabled=false;
     alert('meeting closed');
   
 }


 const setStopVideo=() =>{
  const html = ` <i class="fas fa-video"></i>
  <span>not in meeting </span>
  `
  document.querySelector('.main_video_button').innerHTML= html;

}

 const share =() =>{
  var share = document.createElement('input'),
  text = window.location.href;

document.body.appendChild(share);
share.value = text;
share.select();
document.execCommand('copy');
document.body.removeChild(share);
alert('you coppied text now share link to other Participants')
 }
