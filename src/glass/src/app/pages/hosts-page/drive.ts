// initialize SVG.js
var draw = SVG().addTo('body').size(600, 600)
// Rackmount 2U, 1 Row, 24 Columns, 24 slots 2.5", Drive Vertical, NON-Hot-Swap

var server_type = "Rackmount" // "Tower"
var server_u = 2
var drive_row = 1
var drive_col = 24
var drive_slot = 24
var slot_type = 3.5
var drive_ori = "vertical" // "horizontal"

const box_width = (server_type == "Rackmount") ? 300 : server_u * 25;
const box_height = (server_type == "Rackmount") ? server_u * 50 : 300;

const drive_width = (drive_ori == "vertical") ? 25 : slot_type * 25
const drive_height = (drive_ori == "vertical") ? slot_type * 25 : 25

var box = draw.rect(box_width, box_height)
var box_label = draw.line(0, 0, 50, 0)
var power_buttom = draw.circle().fill('none').radius(10).move(15, 15)
var all_harddrives = new SVG.List([])
var server_rect_list = new SVG.List([box, all_harddrives])
var drive = draw.rect(drive_width, drive_height)

for (i = 0; i < drive_slot; i++) {
	  new_drive = drive.clone()
	    new_drive.move(50, 0)
	      all_harddrives.push(new_drive)
}
var text = draw.text("HDD").rotate(90)

var decoration = draw.group()
var server = draw.group()
decoration.add(box_label)
decoration.add(power_buttom)
decoration.stroke({
	  width: 5,
	    color: '#000'
}).move(15, 20)

server_rect_list.fill('none').stroke({
	  width: 5,
	    color: '#000'
}).radius(10)

server.add(decoration)
server.add(box)
server.move(100, 50)

/*
// draw pink square
draw.rect(300, 100).move(100, 50).fill('none').stroke({
  width: 5,
   color: '#000'
   }).radius(10)

  draw.line(110, 70, 150, 70).stroke({
   width: 5,
    color: '#000'
    })

   draw.circle().fill('none').stroke({
    width: 5,
     color: '#000'
     }).radius(10).move(115, 90)
    */


