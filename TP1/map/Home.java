package map;


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

	class Home{
		private boolean isDisplayed;
		private int price;
		private Point location;
		private int diametre;
		
		public Home(Point xy, int d, int p){
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


}

