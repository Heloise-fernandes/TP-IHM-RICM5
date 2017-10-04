package JeVeuxJusteFaireUnDossierGitSTP;


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

//public class Home {
//
//	public ArrayList<Home> homeList = new ArrayList<Home>();
//
//	public Homes(int resolutionX, int resolutionY, int resolutionW, int resolutionH, int numberHome){
//
//		
//
//	}

//	public void changeVisibilityPrice(int lowerbound, int upperbound){
//		for (int i=0; i<homeList.size();i++){
//			if ((homeList.get(i).price >=lowerbound)||(homeList.get(i).price <=upperbound)){
//				homeList.get(i).isDisplayed = true;
//			}
//			else {
//				homeList.get(i).isDisplayed = false;
//			}
//		}
//	}

	class Home extends JPanel{
		private boolean isDisplayed;
		private int price;
		private Point location;
		private int diametre;
		//public Image image;

		public Home(Point xy, int d, int p){
//			try {                
//				image = ImageIO.read(new File("src/house.jpg"));
//				image = image.getScaledInstance(10, 10, Image.SCALE_DEFAULT);
//			} catch (IOException ex) {
//				System.out.println("l'image a fail :'(");
//			}
			location = xy;
			diametre = d;
			price = p;
			isDisplayed = true;
		}

		public int getPrice() {
			return price;
		}

		public Point getLocation() {
			return location;
		}

		public int getDiametre() {
			return diametre;
		}

//		@Override
//		protected void paintComponent(Graphics g) {
//			if (isDisplayed){
//				super.paintComponent(g);
//				System.out.println("paintcompo called : x="+location.x+" y="+location.y );
//				g.drawImage(image, location.x, location.y, this);            
//			}
//		}

//	public Dimension getPreferredSize() {
//		return new Dimension(10, 10); // appropriate constants
//	}
		
	
//	}

		
	



}

