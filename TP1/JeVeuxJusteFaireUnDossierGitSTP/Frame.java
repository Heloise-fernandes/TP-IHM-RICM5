package ichachouch;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;

import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;


public class Frame extends JFrame{

	public Frame(){
		JFrame mainWindow = new JFrame();
		JPanel mySuperJPanel = new JPanel();
		Canvas myUbiquitousCanvas = new Canvas();
		mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainWindow.setSize(500, 500);
		MyAwesomeScreen mysc = new MyAwesomeScreen(5,5,4*mainWindow.getWidth()/5,mainWindow.getHeight()-50);
		mainWindow.add(mysc);
		
		Homes homes = new Homes(5,5,4*mainWindow.getWidth()/5,mainWindow.getHeight()-50, 5);
		for (int i=0; i<homes.homeList.size(); i++){
			System.out.println(homes.homeList.get(i).location.toString());
			mainWindow.add(homes.homeList.get(i));
		}
		mainWindow.validate();
		//mainWindow.add(mySuperJPanel);
		//mainWindow.setSize(500,500);

		mainWindow.setLocationRelativeTo(null);
		mainWindow.setVisible(true);
	}



	class MyAwesomeScreen extends JPanel {
		int startX,startY,width,height;
		
		public MyAwesomeScreen(int x, int y, int w, int h){
			startX = x;
			startY = y;
			width = w;
			height = h;
			
		}
		public void paint(Graphics g) {		
			g.setColor(Color.LIGHT_GRAY);
			g.drawRect (startX,startY,width,height);
			g.fillRect(startX,startY,width,height);
			g.setColor(Color.black);
		}
		
		public Dimension getPreferredSize() {
		    return new Dimension(width, height); // appropriate constants
		}
	}

}