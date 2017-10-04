package Rangeslider;
import javax.swing.JLabel;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class ListenerChange  implements ChangeListener
{
	private JLabel minVal; 
	private JLabel maxVal;
	
	public ListenerChange(JLabel min, JLabel max) {
		this.minVal = min;
		this.maxVal = max;
	} 
	@Override
	public void stateChanged(ChangeEvent e) {
		RangeSlider slide = (RangeSlider) e.getSource();
		this.minVal.setText("Min : "+slide.getFirstBound());
		this.maxVal.setText("Max : "+slide.getSecondBound());
		
	}
}
