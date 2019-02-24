<?php
  $file=fopen('../../afinn/AFINN-111.txt','r');
  $res=array();
  while(!feof($file)){
    $line=fgets($file);
    $content=explode("\t",$line);
    $res[] =array('word'=> $content[0], 'weight'=> rtrim($content[1],"\n"));
  }
  fclose($file);
  echo json_encode($res);
?>
