import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JSplitPane;
import javax.swing.SwingConstants;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class MainProgram {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JFrame mainWindow = new JFrame();
		mainWindow.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainWindow.setSize(500, 500);
		JLabel min = new JLabel("Min : "+5);
		JLabel max = new JLabel("Max : "+8);
		RangeSlider rangeSlide = new RangeSlider(0, 10, 5, 8);	
		
		rangeSlide.addChangeListener(new ListenerChange(min, max));
		
		JPanel canvas = new JPanel();
		
		JSplitPane data = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,min,max);
		data.setResizeWeight(0.5);
		data.setDividerSize(0);
	
		JSplitPane object = new JSplitPane(JSplitPane.VERTICAL_SPLIT,data,rangeSlide);
		canvas.add(object);
		object.setDividerSize(10);
		
		mainWindow.add(canvas);
		
		mainWindow.setVisible(true);
		
		
	}


}
