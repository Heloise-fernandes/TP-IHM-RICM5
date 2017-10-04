package main;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JSplitPane;
import javax.swing.SwingConstants;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import Rangeslider.ListenerChange;
import Rangeslider.RangeSlider;
import map.Map;

public class MainProgram {

	public static void main(String[] args) {
		
		// TODO Auto-generated method stub
		int max = 1000;
		int min = 500;
		
		JFrame mainWindow = new JFrame();
		mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainWindow.setSize(500, 500);
		
		
		RangeSlider rangeSlide = new RangeSlider(min, max);	
		JLabel minLabel = new JLabel("Min : "+rangeSlide.getFirstBound());
		JLabel maxLabel = new JLabel("Max : "+rangeSlide.getSecondBound());
		Map laCarte = new Map(350,350,100,min, max);
		rangeSlide.addChangeListener(laCarte);
		rangeSlide.addChangeListener(new ListenerChange(minLabel, maxLabel));
		
		JSplitPane data = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,minLabel,maxLabel);
		data.setResizeWeight(0.5);
		data.setDividerSize(0);
	
		JSplitPane objectSlider = new JSplitPane(JSplitPane.VERTICAL_SPLIT,data,rangeSlide);
		objectSlider.setDividerSize(10);
		
		JSplitPane mainpannel = new JSplitPane(JSplitPane.VERTICAL_SPLIT,laCarte,objectSlider);
		mainpannel.setDividerSize(10);
		mainpannel.setResizeWeight(0.95);
		
		mainWindow.add(mainpannel);
		
		mainWindow.setVisible(true);
		
		
	}


}
