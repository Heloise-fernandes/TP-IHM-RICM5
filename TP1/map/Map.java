package map;


import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.Point;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import javax.swing.JPanel;
import javax.swing.border.Border;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import Rangeslider.RangeSlider;
 

public class Map extends JPanel implements ChangeListener{
	
	private ArrayList<Home> listeHomes;
	private int minPrice;
	private int maxPrice;
	
	public Map(int X, int Y, int nbHome, int min, int max)
	{
		super();
		this.maxPrice = max;
		this.minPrice = min;
		this.setPreferredSize(new Dimension(X, Y));
		this.setBackground(Color.WHITE);
		listeHomes = new ArrayList<Home>();
		createListe(X, Y, nbHome);		
	}
	
	public void paint(Graphics g) {
		super.paint(g);
		for(int i = 0 ; i < this.listeHomes.size(); i++)
		{
			Home h = this.listeHomes.get(i);
			if(h.getPrice()>=minPrice && h.getPrice()<=maxPrice )
			{
				Color c = g.getColor();
				g.setColor(Color.RED);
				g.fillOval((int) h.getLocation().getX(),(int) h.getLocation().getY(),h.getDiametre(),h.getDiametre());
			}
			
		}	
	}
	
	private void createListe(int resolutionW, int resolutionH, int numberHome)
	{
		Random tirer_position = new Random();
		
		for (int i =0; i<numberHome; i++){
			int X = tirer_position.nextInt(resolutionW);
			int Y = tirer_position.nextInt(resolutionH);
			int price = (int) (this.minPrice + (Math.random() * (this.maxPrice - this.minPrice)));
			Home newHome = new Home(new Point(X,Y), 10, price);
			listeHomes.add(newHome);
		}
	}
	
	public void refresh(int min, int max)
	{
		this.maxPrice = max;
		this.minPrice = min;
		this.removeAll();
		this.repaint();
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		RangeSlider slide = (RangeSlider) e.getSource();
		refresh(slide.getFirstBound(), slide.getSecondBound());
		
	}
	
	

}
