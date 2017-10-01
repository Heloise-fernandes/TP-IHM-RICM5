package ichachouch;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

public class Homes {

	public ArrayList<Home> homeList = new ArrayList<Home>();

	public Homes(int resolutionX, int resolutionY, int resolutionW, int resolutionH, int numberHome){
		
		for (int i =0; i<numberHome; i++){
			int X = ThreadLocalRandom.current().nextInt(resolutionX, resolutionW + 1);
			int Y = ThreadLocalRandom.current().nextInt(resolutionY, resolutionH + 1);
			Home newHome = new Home(new Point(X,Y));
			homeList.add(newHome);
		}

	}

	class Home extends JPanel{
		Point location;
		public Image image;

		public Home(Point xy){
			try {                
	            image = ImageIO.read(new File("src/house.jpg"));
	            image = image.getScaledInstance(10, 10, Image.SCALE_DEFAULT);
			} catch (IOException ex) {
				System.out.println("l'image a fail :'(");
			}
			location = xy;
		}

		@Override
		protected void paintComponent(Graphics g) {
			super.paintComponent(g);
			System.out.println("paintcompo called : x="+location.x+" y="+location.y );
			g.drawImage(image, location.x, location.y, this);            
		}
		
		public Dimension getPreferredSize() {
		    return new Dimension(10, 10); // appropriate constants
		}
	}




}

